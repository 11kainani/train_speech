import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../../utils/colors";
import { useAnswers } from "../../../hook";
import { Answer } from "../../../models";
import { FilterButton, SearchBar } from "../../../components";
import { DIMENSIONS, responsiveHeight } from "../../../utils";
import { Ionicons } from "@expo/vector-icons";
import { AnswerList } from "../../../components";
import { useAnswerStore } from "../../../stores";

const Answers = () => {
 
  const { answers, fetchAnswers , isLoading } = useAnswerStore();
  const [filteredData, setFilteredData] = useState(answers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (text.trim() === "") {
      setFilteredData(answers);
    } else {
      const newData = answers.filter(
        (item: Answer) =>
          item.subject?.description
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          item.review?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    }
  };

  const onDeleteSuccess = (idAnswer: string) => {
    //setData((prev) => prev.filter((answer) => answer.idAnswer != idAnswer));
    
    //TODO Refresh page to delete selected subject and refresh answer list without deleted answer
  };

  const filterData = () => {
    let filtered = [...answers];

    if (searchQuery) {
      if (searchQuery != "") {
        filtered = filtered.filter(
          (answer) =>
            answer.review?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            answer.subject?.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
      }
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    fetchAnswers(); // Optionally set a separate loading state here if needed
    console.log("From Store", answers);
  }, []);

  useEffect(() => {
    filterData();
  }, [answers, searchQuery]);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.content}>
          <View style={styles.horizontalBar}>
            <SearchBar value={searchQuery} onChangeText={handleSearch} />
            <FilterButton onPress={() => setIsFilterModalVisible(true)} />
          </View>

          <AnswerList onDeleteSuccess={onDeleteSuccess} />
          <View />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    alignSelf: "center",
    width: "90%",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  horizontalBar: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    marginVertical: DIMENSIONS.margin,
    paddingVertical: DIMENSIONS.paddingSmall,
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: responsiveHeight(7),
  },
});
export default Answers;
