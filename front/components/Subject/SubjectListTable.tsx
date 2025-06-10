import React from "react";
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
import { subjectService } from "../../services";
import { SmallConfirmButton } from "../Button";
import { Subject } from "../../models";
import { useRouter } from "expo-router";
import { useSubjectStore } from "../../stores";

interface SubjectListTableProps {
  data: Subject[];

}

const SubjectListTable: React.FC<SubjectListTableProps> = ({
  data,

}) => {
  const router = useRouter();
 const {subjects, deleteSubject} = useSubjectStore();
  const handleItemPress = (itemName: string) => {
    //TODO : Create Subject detail page when click
    console.log(itemName);
  };

  const handleLeftButtonPress = (idSubject: string) => {
    console.log(`Left button pressed for ID: ${idSubject}`);
  };

  const handleRightButtonPress = async (idSubject: string) => {
    console.log(`Deleting subject ${idSubject}`);
    try {
      await subjectService.deleteSubject(idSubject);
      deleteSubject(idSubject);
      
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSubjectAnswer = (item: Subject) => {
    if (item) {
      router.push({
        pathname: "record/[idSubject]",
        params: { subject: JSON.stringify(item) }, // must be serializable
      });
    }
  };

  const renderItem = ({
    item,
  }: {
    item: { idSubject: string; description: string };
  }) => (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.text}
        onPress={() => handleItemPress(item.description)}
      >
        <Text style={styles.item}>{item.description}</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <SmallConfirmButton
          title="Answer"
          onPress={() => handleSubjectAnswer(item)}
        />

        <TouchableOpacity
          onPress={() => handleRightButtonPress(item.idSubject)}
          style={styles.delete}
        >
          <Ionicons
            name="settings-sharp"
            size={DIMENSIONS.iconSize}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.segmentation}>
      <FlatList
        data={subjects}
        keyExtractor={({ idSubject }) => idSubject}
        renderItem={renderItem}
        persistentScrollbar={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  segmentation: {
    width: "100%",
    height: "75%",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    minHeight: responsiveHeight(5),
    marginVertical: DIMENSIONS.marginSmall,
    padding: DIMENSIONS.paddingSmall,
    borderColor: COLORS.primary,
    borderWidth: DIMENSIONS.border,
    borderRadius: DIMENSIONS.radius,
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
});

export default SubjectListTable;
