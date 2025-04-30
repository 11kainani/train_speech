// components/FilterPanel.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import {DefiniteActionButton, PanelButton, FilterModal} from "../../components";
import { SubjectType } from "../../models";
import { COLORS, DIMENSIONS } from "../../utils"; 

interface FilterPanelProps {
  isVisible: boolean;
  isFiltered: SubjectType;
  setIsFilterModalVisible: (val: boolean) => void;
  setIsFiltered: (type: SubjectType) => void;
  handleFilterByType: (type: SubjectType) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  isVisible,
  isFiltered,
  setIsFilterModalVisible,
  setIsFiltered,
  handleFilterByType,
}) => {
  return (
    <FilterModal
      isVisible={isVisible}
      onClose={() => setIsFilterModalVisible(false)}
    >
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter By Type</Text>
        <View style={styles.underline} />
        <View style={styles.horizontalFilterButton}>
          <PanelButton
            title={"Prompt"}
            selected={isFiltered === SubjectType.PROMPT}
            style={styles.filterText}
            onPress={() => handleFilterByType(SubjectType.PROMPT)}
          />
          <PanelButton
            title={"Question"}
            selected={isFiltered === SubjectType.QUESTION}
            onPress={() => handleFilterByType(SubjectType.QUESTION)}
          />
          <PanelButton
            title={"Unassigned"}
            selected={isFiltered === SubjectType.UNASSIGNED}
            onPress={() => handleFilterByType(SubjectType.UNASSIGNED)}
          />
        </View>
        <Text style={styles.filterTitle}>Filter By Answer</Text>
        <View style={styles.underline} />
        <Text style={styles.filterTitle}>Order By Date</Text>
        <View style={styles.underline} />
        <View style={styles.horizontalFilterConfirmationButton}>
          <View style={styles.filerClearButton}>
            <DefiniteActionButton
              title={"Clear"}
              onPress={() => {
                setIsFiltered(SubjectType.NONE);
                setIsFilterModalVisible(false);
              }}
            />
          </View>
        </View>
      </View>
    </FilterModal>
  );
};

const styles = StyleSheet.create({
  underline: {
    borderWidth: DIMENSIONS.unit,
    marginBottom: DIMENSIONS.margin,
    borderColor: COLORS.textPrimary,
  },
  horizontalFilterButton: {
    flexDirection: "row",
    justifyContent: "center",
    padding: DIMENSIONS.padding,
  },
  horizontalFilterConfirmationButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: DIMENSIONS.margin,
  },
  filerClearButton: {
    width: "100%",
  },
  filterContainer: {
    width: "100%",
  },
  filterTitle: {
    fontSize: DIMENSIONS.font,
    fontWeight: "bold",
  },
  filterText: {
    fontSize: DIMENSIONS.bordersmall,
  },
});

export default FilterPanel;
