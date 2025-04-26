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
import { subjectService } from "../../api";
import { SmallConfirmButton } from "../Button";

interface SubjectListTableProps {
  data: {
    idSubject: string;
    description: string;
  }[];
  onDeleteSuccess?: (subjectId: string) => void;
}

const SubjectListTable: React.FC<SubjectListTableProps> = ({
  data,
  onDeleteSuccess,
}) => {
  const handleItemPress = (itemName: string) => {
    console.log(itemName);
  };

  const handleLeftButtonPress = (idSubject: string) => {
    console.log(`Left button pressed for ID: ${idSubject}`);
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

      <View style= {styles.buttonContainer}>
        <SmallConfirmButton title="Create Subject" />

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
        data={data}
        keyExtractor={({ idSubject }) => idSubject}
        renderItem={renderItem}
        persistentScrollbar={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  segmentation: {
   
    width: responsiveWidth(90),
    height: "75%",
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

  buttonContainer : {
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
