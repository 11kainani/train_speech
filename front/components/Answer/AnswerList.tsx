import React, { useState } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { COLORS, DIMENSIONS } from "../../utils";
import { answerService, subjectService } from "../../services";
import { Answer } from "../../models";
import { MediaPlayer } from "../Audio";
import { useRouter } from "expo-router";
import { useAnswerStore } from "../../stores";

interface AnswerListProps {
  onDeleteSuccess?: (idAnswer: string) => void;
}

const AnswerList: React.FC<AnswerListProps> = ({ onDeleteSuccess }) => {
  const [expandItemId, setExpandItemId] = useState<string | null>(null);
  const { answers, deleteAnswer } = useAnswerStore();
  const router = useRouter();

  const handleItemPress = (id: string) => {
    setExpandItemId((prev) => (prev === id ? null : id));
  };

  const handleDelete = async (idAnswer: string) => {
    console.log(`Deleting subject ${idAnswer}`);
    try {
      deleteAnswer(idAnswer);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSettingsPress = (answer: Answer) => {
    try {
    
      router.push({
        pathname: "/answer/[idAnswer]",
        params: {
          idAnswer: answer.idAnswer,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSettingsLongPress = (answer: Answer) => {
    console.log("longPressed");
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
        <MediaPlayer
          idAnswer={item.idAnswer}
          onSettingsPress={() => handleSettingsPress(item)}
          onSettingsLongPress={() => handleSettingsLongPress(item)}
        />
      )}
    </View>
  );
  return (
    <View style={styles.segmentation}>
      <FlatList
        data={answers}
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
    paddingVertical: DIMENSIONS.marginSmall,
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
