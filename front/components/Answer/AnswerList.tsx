import React, { useState } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  COLORS,
  DIMENSIONS,
  responsiveHeight,
  responsiveWidth,
} from "../../utils";
import { subjectService } from "../../api";
import { SmallConfirmButton } from "../Button";
import { Answer, Subject } from "../../models";
import { SubjectCard } from "../Record";
import { MediaPlayer } from "../Audio";

interface AnswerListProps {
  data: Answer[];
  onDeleteSuccess?: (idSubject: string) => void;
}

const AnswerList: React.FC<AnswerListProps> = ({ data, onDeleteSuccess }) => {
  const [expandItemId, setExpandItemId] = useState<string | null>(null);

  const handleItemPress = (id: string) => {
    setExpandItemId((prev) => (prev === id ? null : id));
  };

  const handleRightButtonPress = async (idSubject: string) => {
    console.log(`Deleting subject ${idSubject}`);
    try {
      await subjectService.deleteSubject(idSubject);
      console.log("Deleted successfully");

      if (onDeleteSuccess) {
        onDeleteSuccess(idSubject);
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const renderItem = ({ item }: { item: Answer }) => (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.content}
        onPress={() => handleItemPress(item.idAnswer)}
      >
        <View style={[styles.cardBase, styles.subjectCard]}>
          <Text style={styles.cardText}>{item.subject.description}</Text>
        </View>
        <View style={[styles.cardBase, styles.answerCard]}>
          <Text style={styles.cardText}>{item ? item.review : ""}</Text>
        </View>
      </TouchableOpacity>
      {expandItemId === item.idAnswer && (
        <MediaPlayer answer={item} />
      )}
    </View>
  );
  return (
    <View style={styles.segmentation}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.idAnswer}
        renderItem={renderItem}
        persistentScrollbar={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  segmentation: {
    width: "100%",
    height: "90%",
    alignSelf: "center",
  },

  item: {
    padding: DIMENSIONS.paddingSmall,
    color: COLORS.textPrimary,
    fontSize: DIMENSIONS.font,
    fontWeight: "bold",
    marginRight: DIMENSIONS.marginSmall,
    textAlign: "justify",
  },

  container: {
    borderColor: COLORS.primary,
    borderWidth: DIMENSIONS.border,
    borderRadius: DIMENSIONS.radius,
    marginVertical: DIMENSIONS.marginSmall,
    paddingVertical : DIMENSIONS.marginSmall,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-around",
    paddingHorizontal: DIMENSIONS.paddingSmall,
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  delete: {},
  text: {
    flex: 1,
    marginRight: DIMENSIONS.marginSmall,
  },
  cardBase: {
    width: "100%",
    padding: DIMENSIONS.paddingSmall,
    borderRadius: DIMENSIONS.radiusSmall,
    marginTop: DIMENSIONS.marginSmall,
  },
  answerCard: {
    backgroundColor: COLORS.cardAccent,
  },
  subjectCard: {
    backgroundColor: COLORS.cardBackground,
  },
  cardText: {
    fontSize: DIMENSIONS.font,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default AnswerList;
