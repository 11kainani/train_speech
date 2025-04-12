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
import { COLORS, DIMENSIONS } from "../../utils";
import { subjectService } from "../../api";
import { Subject } from "../../models";


interface FlatListTableProps {
  data:{
      idSubject: string; 
      description: string;
      
  }[],
  onDeleteSuccess?: (subjectId : string)=>  void;
}


const FlatListTable: React.FC<FlatListTableProps> = ({ data, onDeleteSuccess }) => {
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
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => handleLeftButtonPress(item.idSubject)}>
          <Ionicons
            name="settings"
            size={DIMENSIONS.iconSize}
            color={COLORS.white}
            
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.text}
          onPress={() => handleItemPress(item.description)}
        >
          <Text style={styles.item}>{item.description}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRightButtonPress(item.idSubject)}
        >
          <Ionicons
            name="trash-outline"
            size={DIMENSIONS.iconSize}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
    </View>
  );
  return (
    <View style={styles.segmentation}>
      <FlatList
        data={data}
        keyExtractor={({ idSubject }) => idSubject}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  segmentation: {
    backgroundColor: COLORS.subSecondary,
    height: "75%",
  },

  item: {
    padding: 16,
    backgroundColor: COLORS.subSecondary,
    color: COLORS.white,
    textAlign: "center",
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
  },

  line: {
    borderBottomWidth: DIMENSIONS.unit,
    borderBottomColor: COLORS.subAccent,
    width: "85%",
    alignSelf: "center",
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: DIMENSIONS.padding,
    marginVertical: DIMENSIONS.margin,
  },
  text: {
    width: "65%",
    
  },
});

export default FlatListTable;
