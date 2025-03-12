// SubjectBankScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { subjectService } from "../api";
import { COLORS } from "../utils";
import { FlatListTable } from "../components/Display";
import PanelButton from "../components/Button/PanelButton";

const SubjectBankScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);


  const handleSubjectRefresh = () => {
    console.log("Data Refreshed");
    setRefreshData(prev => !prev);
  };
  const fetchSubjects = async () => {
    try {
      const results = await subjectService.getSubjects();
      console.log("Fetched Subjects:", results);
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
    console.log("Filter Questions");
    handleSubjectRefresh();
  };

  const filterPrompt = async () => {
    console.log("Filter Prompt");
    handleSubjectRefresh();
  };
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
            <FlatListTable data={data } 
            onDeleteSuccess={handleSubjectRefresh} />

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
