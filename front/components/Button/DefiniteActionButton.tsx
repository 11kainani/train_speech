import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, DIMENSIONS } from "../../utils";

interface DefiniteActionButtonProps {
  title: string;
  buttonStyle?: object;
  textStyle?: object;
  disable?: boolean,
  onPress?: () => void;
}

const DefiniteActionButton: React.FC<DefiniteActionButtonProps> = ({
  title,
  buttonStyle: style,
  textStyle,
  onPress,
  disable=false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={[styles.content, style]} disabled={disable}>
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
