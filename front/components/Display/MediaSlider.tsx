import {
  View,
  StyleSheet,
  Text,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { COLORS, DIMENSIONS, secondsToFormat } from "../../utils";

interface MediaSliderProps {
  minimumValue?: number;
  maximumValue: number;
  value: number;
  onValueChange: (newValue: number) => void;
  onComplete: () => void;
  resetCompletionTrigger?: number;
}

const MediaSlider: React.FC<MediaSliderProps> = ({
  minimumValue = 0,
  maximumValue,
  value,
  onValueChange,
  onComplete,
  resetCompletionTrigger,

}) => {
  const hasCompleted = useRef(false);
  const progressPercentage =
    maximumValue > 0 ? (value / maximumValue) * 100 : 0;

  useEffect(() => {
    if (!hasCompleted.current && progressPercentage >= 100) {
      hasCompleted.current = true;
      onComplete();
    }
    if (progressPercentage < 99 && hasCompleted.current) {
      hasCompleted.current = false;
    }
  }, [progressPercentage]);

  useEffect(() => {
    hasCompleted.current = false;
  }, [resetCompletionTrigger]);

  /**
   * Offset the positon of the playback
   */

  //TODO: Create slider for audio to reposition the audio
  return (
    <View style={styles.mainContainer}>
      <View style={styles.numberProgression}>
        <Text style={styles.numberText}>{secondsToFormat(value)}</Text>
        <Text style={styles.numberText}>{secondsToFormat(maximumValue)}</Text>
      </View>
      <View style={styles.sliderContainer}>
        <View
          style={[
            styles.complete,
            {
              width: `${progressPercentage}%`,
              backgroundColor: COLORS.primary,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: DIMENSIONS.paddingSmall,
  },
  sliderContainer: {
    width: "100%",
    height: DIMENSIONS.borderThick,
    backgroundColor: COLORS.cardAccent,
    borderRadius: DIMENSIONS.radius,
    justifyContent: "center",
    overflow: "hidden",
  },
  complete: {
    height: DIMENSIONS.borderThick,
    borderRadius: DIMENSIONS.radius,
  },
  numberText: {
    fontSize: DIMENSIONS.font,
    fontWeight: "bold",
  },
  numberProgression: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: DIMENSIONS.paddingSmall,
    minHeight: DIMENSIONS.font * 2,
  },
});

export default MediaSlider;
