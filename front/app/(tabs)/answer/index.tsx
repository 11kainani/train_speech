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

const Answers = () => {
  const [isloading, setLoading] = useState(false);
  const { data, setData } = useAnswers(setLoading);
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (text.trim() === "") {
      setFilteredData(data);
    } else {
      const newData = data.filter(
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
    setData((prev) => prev.filter((answer) => answer.idAnswer != idAnswer));
  };

  const filterData = () => {
    let filtered = [...data];

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
  };

  useEffect(() => {
    filterData();
  }, [data, searchQuery]);
  return (
    <SafeAreaView style={styles.container}>
      {isloading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.content}>
          <View style={styles.horizontalBar}>
            <SearchBar value={searchQuery} onChangeText={handleSearch} />
            <FilterButton onPress={() => setIsFilterModalVisible(true)} />
          </View>

          <AnswerList data={filteredData} onDeleteSuccess={onDeleteSuccess} />
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
