// SubjectBankScreen.js

import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { subjectService } from "../api";
import { COLORS } from "../utils/colors";
import PanelButton from "../components/Button/PanelButton";
import { Subject, SubjectType } from "../../models";
import { AddSubject, FlatListTable } from "../components";

const SubjectBankScreen = () => {


  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Subject[]>([]);
  const [filteredData, setFilteredData] = useState<Subject[]>([]);
  const [refreshData, setRefreshData] = useState(false);
  const [promptIds, setPromptIds] = useState<string[]>([]);
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [isFiltered, setIsFiltered] = useState<SubjectType>(SubjectType.NONE);

  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [description, setDescription] = useState("");

  const handleSubjectRefresh = async () => {
    //Handle delete to directly remove from data the deleted element instead of doing an api call
    //Same for transformation
    setRefreshData((prev) => !prev);
  };

  const jsonToSubject = (data: { subjects: Subject[] }): Subject[] => {
    return data.subjects.map((subject: any) => ({
      description: subject.description,
      idSubject: subject.idSubject,
    }));
  };

  useEffect(() => {
    fetchSubjects();
    fetchQuestionsIds();
    fetchPromptIds();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const results = await subjectService.getSubjects();
      const check = jsonToSubject(results);
      setData(check);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const addSubject = async () => {
    console.log("Pressed Add button");
    setPopUpVisible((prev) => !prev);
    console.log("Pop up", isPopUpVisible);
    handleSubjectRefresh();
  };
  const filterQuestion = async () => {
    setLoading(true);

    if (isFiltered === SubjectType.QUESTION) {
      setIsFiltered(SubjectType.NONE);
    } else {
      const filteredData = data.filter((subject) =>
        questionIds.includes(subject.idSubject)
      );
      setFilteredData(filteredData);
      setIsFiltered(SubjectType.QUESTION);
    }

    setLoading(false);
  };

  const filterPrompt = async () => {
    setLoading(true);
    if (isFiltered === SubjectType.PROMPT) {
      setIsFiltered(SubjectType.NONE);
    } else {
      const filteredData = data.filter((subject) =>
        promptIds.includes(subject.idSubject)
      );
      setFilteredData(filteredData);
      setIsFiltered(SubjectType.PROMPT);
    }
    setLoading(false);
  };

  const fetchPromptIds = async () => {
    try {
      setLoading(true);
      const results = await subjectService.getPrompts();
      setPromptIds(parserPromptId(results));
    } catch (error) {
      console.error("Error fetching prompts", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestionsIds = async () => {
    try {
      setLoading(true);
      const results = await subjectService.getQuestions();
      setQuestionIds(parserQuesionsId(results));
    } catch (error) {
      console.error("Error fetching prompts", error);
    } finally {
      setLoading(false);
    }
  };

  const parserPromptId = (promptJson: any): string[] => {
    const id = promptJson.prompts.map(
      (prompt: { idPrompt: string }) => prompt.idPrompt
    );
    return id;
  };

  const parserQuesionsId = (questionsJson: any): string[] => {
    const id = questionsJson.questions.map(
      (question: { idQuestion: string }) => question.idQuestion
    );
    return id;
  };


  const handleSubjectCreated = (subjectType: SubjectType, createdSubject: Subject) => {
    console.log("Received from modal:", subjectType, createdSubject);

    data.push(createdSubject);
    switch(subjectType)
    {
      case  SubjectType.PROMPT:
        promptIds.push(createdSubject.idSubject);
        break;
      case SubjectType.QUESTION:
        questionIds.push(createdSubject.idSubject);
        break;
    
    }
  };

  const removeSubjectFromData = (subjectId: string) => {
    setPromptIds(prev => prev.filter(id => id !== subjectId));
    setQuestionIds(prev => prev.filter(id => id !== subjectId));
  
    setData(prev => prev.filter(subject => subject.idSubject !== subjectId));
    setFilteredData(prev =>
      prev.filter(subject => subject.idSubject !== subjectId)
    );
  };
  

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.control}>
            <View style={styles.filterBar}>
              <PanelButton
                style={[
                  styles.filterButton,
                  isFiltered === SubjectType.QUESTION
                    ? styles.activeFilter
                    : styles.unactiveFilter,
                ]}
                title={"Questions"}
                onPress={filterQuestion}
              />
              <PanelButton
                style={[
                  styles.filterButton,
                  isFiltered === SubjectType.PROMPT
                    ? styles.activeFilter
                    : styles.unactiveFilter,
                ]}
                title={"Prompt"}
                onPress={filterPrompt}
              />
            </View>

            {isFiltered != SubjectType.NONE ? (
              <FlatListTable
                data={filteredData}
                onDeleteSuccess={removeSubjectFromData}
              />
            ) : (
              <FlatListTable
                data={data}
                onDeleteSuccess={removeSubjectFromData}
              />
            )}

            <PanelButton
              style={styles.addButton}
              title={"Add Subject"}
              onPress={addSubject}
            />
            
          </View>
        </View>
      )}
      <AddSubject
        isVisible={isPopUpVisible}
        onClose={() => setPopUpVisible(false)}
        description={description}
        setDescription={setDescription}
        onSubmit={handleSubjectCreated}
      ></AddSubject>
    </View>
  );
};

export const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
  },
  container: {
    backgroundColor: COLORS.backgroundDark,
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },

  control: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
  },

  table: {
    maxHeight: "90%",
    backgroundColor: COLORS.primaryText,
  },

  addButton: {
    alignSelf: "center",
    backgroundColor: COLORS.subSecondary,
    color: COLORS.white,
  },

  filterBar: {
    flexDirection: "row",
  },

  filterButton: {
    flex: 1,

    backgroundColor: COLORS.backgroundDark,
    color: COLORS.white,
  },

  activeFilter: {
    color: COLORS.primaryText,
    fontWeight: "bold",
  },

  unactiveFilter: {},
});

export default SubjectBankScreen;
