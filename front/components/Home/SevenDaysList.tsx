import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { COLORS, getPastXDays } from "../../utils";
import { useAnswerStore } from "../../stores";
import { useState, useEffect } from "react";

const SevenDaysList = () => {
  const [isLoading, setLoading] = useState(false);
  const { answers, fetchAnswers } = useAnswerStore();

  useEffect(() => {
    if (answers.length == 0) {
      fetchAnswers();
    }
  });
  const past7Days = getPastXDays(7);
  const countByDate = past7Days.map((dateStr) => {
    const dayAnswers = answers.filter((answer) => {
      if (!answer.createdAt) return false;
      return answer.createdAt.startsWith(dateStr);
    });

    return {
      date: dateStr,
      count: dayAnswers.length,
      answers: dayAnswers,
    };
  });

  useEffect(() => {
    const seperation = countByDate;
    console.log("This is the seperation: ", seperation);
  }, [answers]);

  return (
    <View style={styles.display}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text>HAHAH</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    width: "90%",
    maxHeight: "10%",
    alignSelf: "center",
    backgroundColor: COLORS.black,
  },
});

export default SevenDaysList;
