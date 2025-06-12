import { View, Text, StyleSheet, FlatList } from "react-native";
import { Subject } from "../../models";
import { DIMENSIONS } from "../../utils";
import { SubjectListTable } from "../Subject";

interface RecentSubjectsProps {
  subjects: Subject[];
}

const RecentSubjects: React.FC<RecentSubjectsProps> = ({ subjects }) => {
  const orderFilterSubject = (maxSubjects: number) => {
    let ordered = [...subjects];
    ordered = ordered
      .filter(
        (s): s is typeof s & { createdAt: string } => s.createdAt !== undefined
      )
      .sort((a, b) => {
        const dateA = new Date(a.createdAt!);
        const dateB = new Date(b.createdAt!);
        return dateB.getTime() - dateA.getTime() ;
      });

    return ordered.slice(0, maxSubjects);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleLabel}> Recently Created Subjects</Text>
      <SubjectListTable data={orderFilterSubject(3)} />
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

export default RecentSubjects;
