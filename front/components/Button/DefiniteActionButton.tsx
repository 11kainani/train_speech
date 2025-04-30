import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, DIMENSIONS } from "../../utils";

interface DefiniteActionButtonProps {
  title: string;
  buttonStyle?: object;
  textStyle?: object;
  onPress?: () => void;
}

const DefiniteActionButton: React.FC<DefiniteActionButtonProps> = ({
  title,
  buttonStyle: style,
  textStyle,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={[styles.content, style]}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
    marginTop: DIMENSIONS.margin,
  },
  content: {
    backgroundColor: COLORS.error,
    borderRadius: DIMENSIONS.radius,
    paddingVertical: DIMENSIONS.paddingSmall,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: DIMENSIONS.font,
    fontWeight: "bold",
    color: COLORS.textOnPrimary,
    textTransform: "uppercase",

  },
});

export default DefiniteActionButton;
