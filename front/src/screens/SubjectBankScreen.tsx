// SubjectBankScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,

} from "react-native";
import { subjectService } from "../api";
import { COLORS } from "../utils";
import { FlatListTable } from "../components/Display";
import PanelButton from "../components/Button/PanelButton";
import { Subject, Prompt } from "../models";

const SubjectBankScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Subject[]>([]);
  const [filteredData, setfilteredData] = useState<Subject[]>([]);
  const [refreshData, setRefreshData] = useState(false);
  const [promptIds, setPromptIds] = useState<string[]>([]);
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);


  const handleSubjectRefresh = async () => {
    setRefreshData(prev => !prev);

    console.log("Is Filtered:", isFiltered, "Filter", filteredData)
  };

  const jsonToSubject = (data: { subjects: Subject[]}): Subject[] => {
      return data.subjects.map((subject:any) => ({ 
        description: subject.description,
        idSubject: subject.idSubject,
      }));
  };

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const results = await subjectService.getSubjects();
      const check = jsonToSubject(results)
      //console.log("Fetched Subjects:", check);
      setData(results.subjects);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const addSubject = async () => {
    console.log("Pressed Add button");
    handleSubjectRefresh();
  };
  const filterQuestion = async () => {
    
    console.log("questions", questionIds);
    if(!filteredData)
      {
        searchQuestionsIds();
      }else
      {
        const filteredData = data.filter(subject => questionIds.includes(subject.idSubject));
        console.log(filteredData);
        setfilteredData(filteredData);
      }
      setIsFiltered(prev => !prev)
      
      handleSubjectRefresh();
  };

  const filterPrompt = async () => {

    if(!filteredData)
    {
      searchPromptIds();
    }else
    {
      const filteredData = data.filter(subject => promptIds.includes(subject.idSubject));
      setfilteredData(filteredData);
    }
    setIsFiltered(prev => !prev)
    
    handleSubjectRefresh();
  };

  const searchPromptIds = async () => {
    try{
      setLoading(true);
      const results = await subjectService.getPrompts();
      setPromptIds(parserPromptId(results));
      const filteredData = data.filter(subject => promptIds.includes(subject.idSubject));
      setfilteredData(filteredData);
    }catch(error)
    {

    }finally{
      setLoading(false);
    }
  }

    const searchQuestionsIds = async () => {
    try{
      setLoading(true);
      const results = await subjectService.getQuestions();
      setQuestionIds(parserPromptId(results));
      const filteredData = data.filter(subject => questionIds.includes(subject.idSubject));
      setfilteredData(filteredData);
    }catch(error)
    {

    }finally{
      setLoading(false);
    }
  }

  const parserPromptId = (promptJson: any): string[] => {
   const id = promptJson.prompts.map((prompt: { idPrompt: string; }) => prompt.idPrompt);
    return id;

  }
  // Use useEffect to fetch subjects when component mounts
  useEffect(() => {
    fetchSubjects();
    setLoading(false);
    
  }, [refreshData]); // Empty dependency array means this runs only on mount

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.control}>
            <View style={styles.filterBar}>
              <PanelButton
                style={styles.filterButton}
                title={"Questions"}
                onPress={filterQuestion}
              />
              <PanelButton
                style={styles.filterButton}
                title={"Prompt"}
                onPress={filterPrompt}
              />
            </View>
            
            
              {isFiltered ? (<FlatListTable data={filteredData } 
            onDeleteSuccess={handleSubjectRefresh} />) : (<FlatListTable data={data } 
            onDeleteSuccess={handleSubjectRefresh} />)}
        
            

            <PanelButton
              style={styles.addButton}
              title={"Add/Subject"}
              onPress={addSubject}
            />
          </View>
        </View>
      )}
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

  control : {
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
});

export default SubjectBankScreen;
