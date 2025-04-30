import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, Button } from "react-native";
import { COLORS } from "../../utils/colors";
import { DIMENSIONS, responsiveHeight, responsiveWidth } from "../../utils";

interface PanelButtonProps {
  title: string; 
  style?: object; 
  onPress?: () => void;
  selected?: boolean;

  }
const PanelButton: React.FC<PanelButtonProps> = ({
  title,
  style,
  onPress,
  selected = true,
}) => {
  return (
    <TouchableOpacity
      style={[
        panelStyle.panelBase,
        selected ? panelStyle.panelSelected : panelStyle.panelUnselected,
        style,
      ]}
      onPress={onPress}
    >
      <View style={panelStyle.container}>
        <Text
          style={[
            panelStyle.textBase,
            selected ? panelStyle.selectedText : panelStyle.nonSelectedText,
          ]}
        >
          {" "}
          {title}{" "}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const panelStyle = StyleSheet.create({
  panelBase: {
    borderRadius: DIMENSIONS.radiusSmall,
    paddingVertical: DIMENSIONS.paddingSmall,
    paddingHorizontal: DIMENSIONS.paddingLarge,
    justifyContent: "center",
    alignItems: "center",
    margin: DIMENSIONS.marginSmall,
    borderWidth: DIMENSIONS.border,
    borderColor: COLORS.primary,
  },

  panelSelected: {
    backgroundColor: COLORS.primary,

  },

  panelUnselected: {
    backgroundColor: COLORS.background,
  },

  textBase: {
    fontSize: DIMENSIONS.font,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlignVertical: "center",
    textAlign: "center",
  },
  selectedText: {
    color: COLORS.textOnPrimary,
  },

  nonSelectedText: {
    color: COLORS.primary,
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PanelButton;
