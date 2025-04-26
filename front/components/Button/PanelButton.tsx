import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, Button } from "react-native";
import { COLORS } from "../../utils/colors";
import { DIMENSIONS, responsiveHeight, responsiveWidth } from '../../utils';



const PanelButton: React.FC<PanelButtonProps> = ({ title, style, onPress, selected=true }) => {

  

  return (
    <TouchableOpacity
      style={[panelStyle.panel, style]}
      onPress={onPress}
      
    >
      <View style={panelStyle.container}>
        <Text style={selected ? panelStyle.selectedText : panelStyle.nonSelectedText}> {title} </Text>
      </View>
    </TouchableOpacity>
  );
};

const panelStyle = StyleSheet.create({
  panel: {
    backgroundColor: COLORS.primary,
    borderRadius: DIMENSIONS.radiusSmall,
    paddingVertical: DIMENSIONS.paddingSmall,
    paddingHorizontal: DIMENSIONS.paddingLarge,
    justifyContent: "center",
    alignItems: "center",
    margin:DIMENSIONS.margin,


  },

  selectedText: {
    color: COLORS.textOnPrimary,
    fontSize: DIMENSIONS.font,
    fontWeight: "bold",
    textTransform: 'uppercase',
    textAlignVertical: "center",
    textAlign: "center",
    


  },

  nonSelectedText : {
    color: COLORS.primary,
    fontSize: DIMENSIONS.font,
    fontWeight: "bold",
    textTransform: 'uppercase',
    textAlignVertical: "center",
    textAlign: "center",
  },

  container: {
    justifyContent: "center", 
    alignItems: "center", 

  },
});

export default PanelButton;
