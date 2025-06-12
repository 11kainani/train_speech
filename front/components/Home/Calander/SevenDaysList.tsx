import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  FlatList,
} from "react-native";
import { COLORS, DIMENSIONS, getPastXDays } from "../../../utils";
import { useAnswerStore } from "../../../stores";
import { useState, useEffect, useMemo } from "react";
import CardDisplay from "./CardDisplay";

const SevenDaysList = () => {
  const [isLoading, setLoading] = useState(false);
  const { answers, fetchAnswers } = useAnswerStore();

  useEffect(() => {
    if (answers.length == 0) {
      fetchAnswers();
    }
  }, []);

  const past7Days = getPastXDays(7);

  const countByDate = useMemo(() => {
  return past7Days.map((dateStr) => {
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
}, [answers]);



  return (
    <View style={styles.display}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={countByDate}
            keyExtractor={(item) => item.date}
            columnWrapperStyle={styles.calanderRow}
            numColumns={7}
            renderItem={({ item }) => {
              return (
                <View style={styles.calanderContainer}>
                  <CardDisplay
                    count={item.count}
                    date={item.date}
                    answer={item.answers}
                  />
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: COLORS.background,
    marginVertical: DIMENSIONS.margin,
  },
  container: {},
  calanderRow: { flexDirection: "row-reverse", justifyContent: "space-around" , marginVertical: DIMENSIONS.marginSmall},
  calanderContainer: {alignItems: "center", width: "12%"},
});

export default SevenDaysList;
