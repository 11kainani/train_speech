import React from "react";
import { View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { COLORS, DIMENSIONS } from "../../utils";

interface IconButtonProps {
  backgroundColor?: string;
  icon: React.ReactNode;
  onPress?: () => void;
  onLongPress? : () => void;
  disable?: boolean;
  small?:boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  backgroundColor,
  icon,
  onPress,
  disable,
  small=false,
  onLongPress,
}) => {
  const finalBackgroundColor = disable
    ? COLORS.disabled
    : backgroundColor ?? COLORS.primary;
  return (
    <Pressable
      style={styles.roundContainer}
      onPress={onPress}
      disabled={disable}
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
     paddingVertical: DIMENSIONS.paddingSmall,
    paddingHorizontal: DIMENSIONS.paddingSmall,
    marginHorizontal: DIMENSIONS.marginSmall,
  },
});

export default IconButton;
