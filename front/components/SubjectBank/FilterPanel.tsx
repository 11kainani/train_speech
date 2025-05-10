// components/FilterPanel.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { DefiniteActionButton, PanelButton } from "../Button";
import { FilterModal } from "../Page";
import { SubjectType } from "../../models";
import { COLORS, DIMENSIONS } from "../../utils";

interface FilterPanelProps {
  isVisible: boolean;
  setIsFilterModalVisible: (val: boolean) => void;
  onApplyFilters: (answerFilter: AnswerState, orderFilter: OrderState) => void;
}

enum AnswerState {
  ANSWERED = "answer",
  UNANSWERD = "unanswered",
  NONE = "none",
}

enum OrderState {
  ASCENDING = "ascending",
  DESCENDING = "descending",
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  isVisible,
  setIsFilterModalVisible,
  onApplyFilters,
}) => {
  const [filterByAnswer, setFilterbyAnswer] = useState<AnswerState>(
    AnswerState.NONE
  );
  const [isOrderBy, setOrderby] = useState<OrderState>(OrderState.DESCENDING);
  const handleAnswer = (state: AnswerState) => {
    if (state === filterByAnswer) {
      setFilterbyAnswer(AnswerState.NONE);
    } else {
      setFilterbyAnswer(state);
    }
  };
  const handleOrder = (state: OrderState) => {
    if (state != isOrderBy) {
      setOrderby(state);
    }
  };

  return (
    <FilterModal
      isVisible={isVisible}
      onClose={() => setIsFilterModalVisible(false)}
    >
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter By Answer</Text>
        <View style={styles.underline} />
        <View style={styles.horizontalFilterButton}>
          <PanelButton
            title="Unanswered"
            selected={filterByAnswer === AnswerState.UNANSWERD}
            onPress={() => handleAnswer(AnswerState.UNANSWERD)}
            style={styles.filteringButton}
          />
          <PanelButton
            title="Answered"
            selected={filterByAnswer === AnswerState.ANSWERED}
            onPress={() => handleAnswer(AnswerState.ANSWERED)}
            style={styles.filteringButton}
          />
        </View>
        <Text style={styles.filterTitle}>Order By Date</Text>
        <View style={styles.underline} />
        <View style={styles.horizontalFilterButton}>
        <PanelButton
            title="Descending"
            selected={isOrderBy === OrderState.DESCENDING}
            onPress={() => handleOrder(OrderState.DESCENDING)}
            style={styles.filteringButton}
          />
          <PanelButton
            title="Ascending"
            selected={isOrderBy === OrderState.ASCENDING}
            onPress={() => handleOrder(OrderState.ASCENDING)}
            style={styles.filteringButton}
          />
        </View>
        <View style={styles.horizontalFilterConfirmationButton}>
          <View style={styles.filerClearButton}>
            <DefiniteActionButton
              title={"Apply"}
              onPress={()=> 
                {onApplyFilters(filterByAnswer,isOrderBy)
                setIsFilterModalVisible(false)}
              }
              buttonStyle={styles.applyButton}
            />
            <DefiniteActionButton
              title={"Clear"}
              onPress={() => {
                setOrderby(OrderState.DESCENDING);
                setFilterbyAnswer(AnswerState.NONE);
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
    flexWrap: "wrap",
    marginBottom: DIMENSIONS.padding,
  },

  filteringButton: {
    width: "40%",
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

  applyButton: {
    backgroundColor: COLORS.primary,
  },
});

export default FilterPanel;
