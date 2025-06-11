import { View, Text, StyleSheet } from "react-native";
import { COLORS, daysOfWeek, DIMENSIONS, monthsInYear } from "../../utils";
import { Answer } from "../../models";

interface CardDisplayProp {
  date: string;
  count: number;
  answer: Answer[];
}

const CardDisplay: React.FC<CardDisplayProp> = ({ date, count, answer }) => {
  let [year, month, day] = date.split("-");

  // Create date object (month - 1 because it's zero-indexed)
  const dayDate = new Date(Number(year), Number(month) - 1, Number(day));
  const displayDay = dayDate.getDate();
  const dayName = daysOfWeek[dayDate.getDay()];
  const monthName = monthsInYear[dayDate.getMonth()];
  const todayDate = new Date();

  return (
    <View
      style={[
        styles.container,
        todayDate.getDate() == Number(day) && styles.todayContainer,
      ]}
    >
      <Text style={styles.monthLabel}>{monthName.slice(0, 3)}</Text>
      {count > 0 && <Text style={styles.countLabel}>{count}</Text>}
      <Text style={styles.bigNumber}>{displayDay}</Text>
      <Text style={styles.weekdayLabel}>{dayName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: DIMENSIONS.border,
    padding: DIMENSIONS.paddingXSmall,
    position: "relative",
    height: "100%",
    width: "100%",
  },
  todayContainer: {
    backgroundColor: COLORS.cardBackground,
  },
  bigNumber: {
    fontSize: DIMENSIONS.fontLarge,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: DIMENSIONS.marginSmall,
  },
  iconNumber: {
    fontSize: DIMENSIONS.fontSmall,
  },

  smallText: {
    fontSize: DIMENSIONS.fontSmall,
  },
  headDisplay: {
    borderWidth: 3,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  monthLabel: {
    fontSize: DIMENSIONS.fontSmall,
    position: "absolute",
    fontWeight: "bold",
    textTransform: "capitalize",
    top: 2,
    left: 2,
  },
  countLabel: {
    fontSize: DIMENSIONS.fontSmall,
    backgroundColor: COLORS.cardAccent,
    borderRadius: 25,
    paddingVertical: DIMENSIONS.unit,
    paddingHorizontal: DIMENSIONS.unit * 4,
    position: "absolute",
    top: 2,
    right: 2,
    alignSelf: "center",
  },
  weekdayLabel: {
    alignSelf: "center",
    fontSize: DIMENSIONS.fontXSmall,
    fontWeight: "bold",
  },
});

export default CardDisplay;
