import React from "react";
import { View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { COLORS, DIMENSIONS } from "../../utils";

interface IconButtonProps {
  backgroundColor?: string;
  icon: React.ReactNode;
  onPress?: () => void;
  onLongPress? : () => void;
  disabled?: boolean;
  small?:boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  backgroundColor,
  icon,
  onPress,
  disabled,
  small=false,
  onLongPress,
}) => {
  const finalBackgroundColor = disabled
    ? COLORS.disabled
    : backgroundColor ?? COLORS.primary;
  return (
    <Pressable
      style={styles.roundContainer}
      onPress={onPress}
      disabled={disabled}
      onLongPress={onLongPress}
    >
      <View style={[styles.content, small && styles.smallContent , { backgroundColor: finalBackgroundColor }]}>
        {icon}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  roundContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  content: {
    borderRadius: 999,
    paddingVertical: DIMENSIONS.padding,
    paddingHorizontal: DIMENSIONS.padding,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: DIMENSIONS.margin,
  },
  smallContent : {
     paddingVertical: DIMENSIONS.paddingXSmall,
    paddingHorizontal: DIMENSIONS.paddingXSmall,
    marginHorizontal: DIMENSIONS.marginSmall,
  },
});

export default IconButton;
