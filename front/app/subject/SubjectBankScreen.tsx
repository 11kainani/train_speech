// SubjectBankScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { subjectService } from "../../api";
import {
  COLORS,
  DIMENSIONS,
  responsiveHeight,
  responsiveWidth,
} from "../../utils";
import PanelButton from "../../components/Button/PanelButton";
import { Subject, SubjectType } from "../../models/Subject";
import { AddSubject, SubjectListTable } from "../../components";
import { SearchBar } from "../../components";
import { Ionicons } from "@expo/vector-icons";

const SubjectBankScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Subject[]>([]);
  const [filteredData, setFilteredData] = useState(data);
  const [promptIds, setPromptIds] = useState<string[]>([]);
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [isFiltered, setIsFiltered] = useState<SubjectType>(SubjectType.NONE);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const jsonToSubject = (data: { subjects: Subject[] }): Subject[] => {
    return data.subjects.map((subject: any) => ({
      description: subject.description,
      idSubject: subject.idSubject,
    }));
  };

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
    setPopUpVisible(true);
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

  const handleSubjectCreated = (
    subjectType: SubjectType,
    createdSubject: Subject
  ) => {
    console.log("Received from modal:", subjectType, createdSubject);

    setData((prevData) => [...prevData, createdSubject]);
    switch (subjectType) {
      case SubjectType.PROMPT:
        setPromptIds((prev) => [...prev, createdSubject.idSubject]);

        break;
      case SubjectType.QUESTION:
        setQuestionIds((prev) => [...prev, createdSubject.idSubject]);
        break;
    }
  };

  const removeSubjectFromData = (subjectId: string) => {
    setPromptIds((prev) => prev.filter((id) => id !== subjectId));
    setQuestionIds((prev) => prev.filter((id) => id !== subjectId));

    setData((prev) =>
      prev.filter((subject) => subject.idSubject !== subjectId)
    );
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (text.trim() === "") {
      setFilteredData(data);
    } else {
      const newData = data.filter((item) =>
        item.description.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    }
  };

  const filterData = () => {
    let filtered = [...data];

    if (searchQuery) {
      filtered = filtered.filter((subject) =>
        subject.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (isFiltered === SubjectType.QUESTION) {
      filtered = filtered.filter((subject) =>
        questionIds.includes(subject.idSubject)
      );
    } else if (isFiltered === SubjectType.PROMPT) {
      filtered = filtered.filter((subject) =>
        promptIds.includes(subject.idSubject)
      );
    }

    setFilteredData(filtered);
  };

  const handleFilter = () => {};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchSubjects();
        await fetchPromptIds();
        await fetchQuestionsIds();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    filterData();
  }, [data,searchQuery, isFiltered]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.control}>
            <View style={styles.horizontalBar}>
              <SearchBar value={searchQuery} onChangeText={handleSearch} />
              <TouchableOpacity onPress={handleFilter}>
                <View style={styles.filterButton}>
                  <Ionicons
                    name="filter"
                    size={DIMENSIONS.iconSize}
                    color={COLORS.primary}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <SubjectListTable
              data={filteredData}
              onDeleteSuccess={removeSubjectFromData}
            />

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
    color: COLORS.primary,
  },
  container: {
    backgroundColor: COLORS.background,
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
    backgroundColor: COLORS.primary,
    color: COLORS.textOnPrimary,
    borderRadius: DIMENSIONS.radius,
  },

  filterBar: {
    flexDirection: "row",
  },

  activeFilter: {
    color: COLORS.primaryText,
    fontWeight: "bold",
  },

  unactiveFilter: {},

  horizontalBar: {
    flex: 1,
    flexDirection: "row",
    marginVertical: DIMENSIONS.margin,
    paddingVertical: DIMENSIONS.paddingSmall,
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: responsiveHeight(7),
  },

  filterButton: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    justifyContent: "center",
    alignItems: "center",
    minWidth: responsiveWidth(7),
    marginLeft: DIMENSIONS.marginSmall,

    borderRadius: DIMENSIONS.border,
  },
});

export default SubjectBankScreen;
