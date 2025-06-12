import { View, Text, StyleSheet, FlatList } from "react-native";
import { Answer } from "../../models";
import { DIMENSIONS } from "../../utils";
import { SubjectListTable } from "../Subject";
import { AnswerList } from "../Answer";

interface RecentAnswersProps {
  answers: Answer[];
}

const RecentAnswers: React.FC<RecentAnswersProps> = ({ answers }) => {

  const orderFilterSubject = (maxAnswers: number) => {
    let ordered = [...answers];
    ordered = ordered
      .filter(
        (s): s is typeof s & { createdAt: string } => s.createdAt !== undefined
      )
      .sort((a, b) => {
        const dateA = new Date(a.createdAt!);
        const dateB = new Date(b.createdAt!);
        return dateB.getTime() - dateA.getTime();
      });

    return ordered.slice(0, maxAnswers);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleLabel}> Recent Answers</Text>
      <AnswerList answers={orderFilterSubject(3)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: DIMENSIONS.margin,
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
  },

  titleLabel: {
    fontSize: DIMENSIONS.fontLarge,
    marginBottom: DIMENSIONS.marginSmall,
    fontWeight: "bold",
  },
});

export default RecentAnswers;
