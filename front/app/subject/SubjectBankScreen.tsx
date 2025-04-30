// SubjectBankScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
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
import {
  AddSubjectModal,
  DefiniteActionButton,
  SmallConfirmButton,
  SubjectListTable,
} from "../../components";
import { SearchBar } from "../../components";
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "../../components/Page/FilterModal";
import { useSubjects } from "../../hook";
import { FilterPanel } from "../../components/SubjectBank";

const SubjectBankScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const {
    data,
    promptIds,
    questionIds,
    unassignedIds,
    setData,
    setPromptIds,
    setQuestionIds,
    setUnassignedIds
  } = useSubjects(setLoading);
  const [filteredData, setFilteredData] = useState(data);
  const [isFiltered, setIsFiltered] = useState<SubjectType>(SubjectType.NONE);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

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
    setUnassignedIds((prev)=> prev.filter((id) => id !==subjectId));

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

    switch (isFiltered) {
      case SubjectType.QUESTION:
        filtered = filtered.filter((subject) =>
          questionIds.includes(subject.idSubject)
        );
        break;
      case SubjectType.PROMPT:
        filtered = filtered.filter((subject) =>
          promptIds.includes(subject.idSubject)
        );
        break;
      case SubjectType.UNASSIGNED: {
        filtered = filtered.filter((subject) =>
          unassignedIds.includes(subject.idSubject)
        );
      }
    }

    setFilteredData(filtered);
  };

  const handleFilterByType = (type: SubjectType) => {
    if (type != isFiltered) {
      setIsFiltered(type);
    } else {
      setIsFiltered(SubjectType.NONE);
    }
  };

 
  useEffect(() => {
    filterData();
  }, [data, searchQuery, isFiltered]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.control}>
            <View style={styles.horizontalBar}>
              <SearchBar value={searchQuery} onChangeText={handleSearch} />
              <TouchableOpacity onPress={() => setIsFilterModalVisible(true)}>
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

            <DefiniteActionButton
              title={"Add Subject"}
              onPress={() => setPopUpVisible(true)}
              buttonStyle={styles.confirmButton}
            />
          </View>
        </View>
      )}
      <AddSubjectModal
        isVisible={isPopUpVisible}
        onClose={() => setPopUpVisible(false)}
        description={description}
        setDescription={setDescription}
        onSubmit={handleSubjectCreated}
      ></AddSubjectModal>
      <FilterPanel
  isVisible={isFilterModalVisible}
  isFiltered={isFiltered}
  setIsFilterModalVisible={setIsFilterModalVisible}
  setIsFiltered={setIsFiltered}
  handleFilterByType={handleFilterByType}
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

  underline: {
    borderWidth: DIMENSIONS.unit,
    marginBottom: DIMENSIONS.margin,
    borderColor: COLORS.textPrimary,
  },

  filterButton: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: DIMENSIONS.marginSmall,
    borderRadius: DIMENSIONS.border,
    paddingHorizontal: DIMENSIONS.paddingSmall,
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
