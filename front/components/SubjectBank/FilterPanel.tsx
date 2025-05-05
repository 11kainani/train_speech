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


}

const FilterPanel: React.FC<FilterPanelProps> = ({
  isVisible,
  setIsFilterModalVisible,

}) => {
  return (
    <FilterModal
      isVisible={isVisible}
      onClose={() => setIsFilterModalVisible(false)}
    >
      <View style={styles.filterContainer}>
        
         
       
        <Text style={styles.filterTitle}>Filter By Answer</Text>
        <View style={styles.underline} />
        <Text style={styles.filterTitle}>Order By Date</Text>
        <View style={styles.underline} />
        <View style={styles.horizontalFilterConfirmationButton}>
          <View style={styles.filerClearButton}>
            <DefiniteActionButton
              title={"Clear"}
              onPress={() => {
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
