import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, Button } from "react-native";
import { COLORS } from "../../utils/colors";
import { responsiveHeight, responsiveWidth } from '../../utils/dimensions';



const PanelButton: React.FC<PanelButtonProps> = ({ title, style, onPress }) => {

  

  return (
    <TouchableOpacity
      style={[panelStyle.panel, style]}
      onPress={onPress}
      
    >
      <View style={panelStyle.container}>
        <Text style={[panelStyle.text, style]}> {title} </Text>
      </View>
    </TouchableOpacity>
  );
};

const panelStyle = StyleSheet.create({
  panel: {
    backgroundColor: COLORS.primary,
    margin: 10,
    height: responsiveHeight(5),
    width: responsiveWidth(50),

  },

  text: {
    color: COLORS.textPrimary,
    textTransform: 'uppercase',
    textAlignVertical: "center",
    textAlign: "center",

  },

  container: {
    justifyContent: "center", //Centered vertically
    alignItems: "center", //Centered horizontally
    flex: 1,
  },
});

export default PanelButton;
