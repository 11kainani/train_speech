import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, Button } from "react-native";
import { COLORS } from "../../utils/colors";
import { responsiveHeight, responsiveWidth } from '../../utils/responsive';

const PanelButton = ({ title, style, onPress }) => {
  return (
    <TouchableOpacity
      style={[panelStyle.panel, style]}
      onPress={onPress}
      
    >
      <View style={panelStyle.container}>
        <Text style={panelStyle.text}> {title} </Text>
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
    color: COLORS.primaryText,
  },

  container: {
    justifyContent: "center", //Centered vertically
    alignItems: "center", //Centered horizontally
    flex: 1,
  },
});

export default PanelButton;
