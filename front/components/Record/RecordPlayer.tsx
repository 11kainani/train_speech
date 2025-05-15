import { View, StyleSheet, Text } from "react-native";
import { COLORS, DIMENSIONS } from "../../utils";
import {
  DefiniteActionButton,
  IconButton,
  PanelButton,
  SmallConfirmButton,
} from "../Button";
import { useState } from "react";
import { AntDesign, Entypo, Feather, FontAwesome } from "@expo/vector-icons";

const RecordPlayer = () => {
  const [isRecording, setIsRecording] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.recordTime}>00:00</Text>
      <IconButton backgroundColor={isRecording ? COLORS.primary : COLORS.red} icon={isRecording ? <Feather name="pause" size={DIMENSIONS.iconSizeXLarge} color={COLORS.secondary} /> : <Entypo name="controller-record" size={DIMENSIONS.iconSizeXLarge} color={COLORS.red} />}/>
      <View style={styles.horizontal}>
        <PanelButton title="save" disable={!isRecording} style={styles.save} />
        <SmallConfirmButton title="delete" style={styles.deleteText} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "45%",
    width: "100%",
    backgroundColor: COLORS.secondary,
    padding: DIMENSIONS.paddingLarge,
    justifyContent: "space-between" ,
     alignItems: "center", 
    
  },
  save: {
    
  },
  recordTime: {
    fontSize: DIMENSIONS.fontXLarge,
    fontWeight: "bold",
   
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // center main button by default
    width: "100%",
    position: "relative",
  },
  deleteText: {
    position: "absolute",
    right: 25,
    backgroundColor: COLORS.red,
  },
});
export default RecordPlayer;
