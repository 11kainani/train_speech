// SubjectBankScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { COLORS, DIMENSIONS, responsiveHeight } from "../../../utils";
import { Subject } from "../../../models/Subject";
import {
  AddSubjectModal,
  DefiniteActionButton,
  FilterButton,
  SubjectListTable,
  SearchBar,
  FilterPanel,
} from "../../../components";

import { useSubjectStore } from "../../../stores";
enum AnswerState {
  ANSWERED = "answer",
  UNANSWERD = "unanswered",
  NONE = "none",
}

enum OrderState {
  ASCENDING = "ascending",
  DESCENDING = "descending",
  NONE = "none",
}

const SubjectBankScreen = () => {
  const {subjects, isLoading} = useSubjectStore();
  const [filteredData, setFilteredData] = useState(subjects);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filterByAnswer, setFilterbyAnswer] = useState<AnswerState>(
    AnswerState.NONE
  );
  const [orderBy, setOrderby] = useState<OrderState>(OrderState.NONE);
  //TODO Do something in the state mangment
  const { answeredIds } = useSubjectStore();
  



  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const filterData = () => {
    let filtered = [...subjects];

    //Search function
    if (searchQuery) {
      filtered = filtered.filter((subject) =>
        subject.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    //Filter by answers
    if (filterByAnswer === AnswerState.ANSWERED) {
      filtered = filtered.filter((subject) =>
        answeredIds.includes(subject.idSubject)
      );
    } else if (filterByAnswer === AnswerState.UNANSWERD) {
      filtered = filtered.filter(
        (subject) => !answeredIds.includes(subject.idSubject)
      );
    }

    // Apply ordering
    if (orderBy === OrderState.ASCENDING) {
      filtered.sort(
        (a, b) =>
          new Date(a.updatedAt ?? "").getTime() -
          new Date(b.updatedAt ?? "").getTime()
      );
    } else if (orderBy === OrderState.DESCENDING) {
      filtered.sort(
        (a, b) =>
          new Date(b.updatedAt ?? "").getTime() -
          new Date(a.updatedAt ?? "").getTime()
      );
    }

    setFilteredData(filtered);
  };

  const handleApplyFilters = (
    answerFilter: AnswerState,
    orderFilter: OrderState
  ) => {
    setFilterbyAnswer(answerFilter);
    setOrderby(orderFilter);
  };

  useEffect(() => {
    filterData();
  }, [subjects, searchQuery, filterByAnswer, orderBy]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.control}>
          <View style={styles.horizontalBar}>
            <SearchBar value={searchQuery} onChangeText={handleSearch} />
            <FilterButton onPress={() => setIsFilterModalVisible(true)} />
          </View>

        <View style= {styles.subjectList}>
          <SubjectListTable data={filteredData} />
           </View>
          

          <DefiniteActionButton
            title={"Add Subject"}
            onPress={() => setPopUpVisible(true)}
            buttonStyle={styles.confirmButton}
          />
        </View>
      )}
      <AddSubjectModal
        isVisible={isPopUpVisible}
        onClose={() => setPopUpVisible(false)}
        description={description}
        setDescription={setDescription}
      ></AddSubjectModal>
      <FilterPanel
        isVisible={isFilterModalVisible}
        setIsFilterModalVisible={setIsFilterModalVisible}
        onApplyFilters={handleApplyFilters}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  text: {
    color: COLORS.primary,
  },
  container: {
    backgroundColor: COLORS.background,

    flex: 1,
  },

  control: {
    width: "90%",
    alignSelf: "center",
  },

  table: {
    maxHeight: "90%",
    backgroundColor: COLORS.textOnPrimary,
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

  subjectList: {
    height: "80%",
  },
  underline: {
    borderWidth: DIMENSIONS.unit,
    marginBottom: DIMENSIONS.margin,
    borderColor: COLORS.textPrimary,
  },

  horizontalFilterConfirmationButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: DIMENSIONS.margin,
  },

  horizontalFilterButton: {
    flexDirection: "row",
    justifyContent: "center",
    padding: DIMENSIONS.padding,
  },
  filterTitle: {
    fontSize: DIMENSIONS.font,
    fontWeight: "bold",
  },
  filterContainer: {
    width: "100%",
  },
  filterText: {
    fontSize: DIMENSIONS.bordersmall,
  },

  filerClearButton: {
    width: "100%",
  },

  confirmButton: {
    backgroundColor: COLORS.primary,
  },
});

export default SubjectBankScreen;
