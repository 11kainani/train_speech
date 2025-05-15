import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, DIMENSIONS } from "../../utils";

interface IconButtonProps {
  backgroundColor?: string;
  icon: React.ReactNode;
  onPress?: () => void;
  disable?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  backgroundColor,
  icon,
  onPress,
  disable,
}) => {
  const finalBackgroundColor = disable
    ? COLORS.disabled
    : backgroundColor ?? COLORS.primary;
  return (
    <TouchableOpacity
      style={styles.roundContainer}
      onPress={onPress}
      disabled={disable}
    >
      <View style={[styles.content, { backgroundColor: finalBackgroundColor }]}>
        {icon}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: DIMENSIONS.margin,
    alignSelf: "center",
  },

  content: {
    borderRadius: 999,
    paddingVertical: DIMENSIONS.padding,
    paddingHorizontal: DIMENSIONS.padding,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default IconButton;
