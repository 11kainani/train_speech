import {
  View,
  StyleSheet,
  TouchableOpacity,
  PanResponderGestureState,
  Text,
  PanResponder,
  GestureResponderEvent,
  LayoutChangeEvent,
  findNodeHandle,
} from "react-native";
import { COLORS, DIMENSIONS, secondsToFormat } from "../../utils";
import { useState, useRef } from "react";

interface MediaSliderProps {
  minimumValue?: number;
  maximumValue: number;
  value: number;
  onValueChange: (newValue: number) => void;
  onComplete: () => void;
  minimumTrackTintColor?: Object;
  maximumTrackTintColor?: Object;
  thumbTintColor?: Object;
}

const MediaSlider: React.FC<MediaSliderProps> = ({
  minimumValue = 0,
  maximumValue,
  value,
  onValueChange,
  onComplete,
  minimumTrackTintColor,
  maximumTrackTintColor,
  thumbTintColor,
}) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderX, setSliderX] = useState(0);
  const sliderRef = useRef<View>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (
        evt: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        if (sliderWidth === 0) return;
        const relativeX = gestureState.moveX - sliderX;
        const touchX = Math.max(0, Math.min(relativeX, sliderWidth));
        const newValue =
          minimumValue + (touchX / sliderWidth) * (maximumValue - minimumValue);
        onValueChange(newValue);
      },
      onPanResponderRelease: () => {
        onComplete();
      },
    })
  ).current;

  const onLayout = () => {
  requestAnimationFrame(() => {
    sliderRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setSliderWidth(width);
      setSliderX(pageX);
      console.log("Measured:", width, pageX);
    });
  });
};

  const progressPourcentage =
    maximumValue > 0 ? (value / maximumValue) * 100 : 0;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.numberProgression}>
        <Text style={styles.numberText}>{secondsToFormat(value)}</Text>
        <Text style={styles.numberText}>{secondsToFormat(maximumValue)}</Text>
      </View>
      <View
        ref={sliderRef}
        style={styles.sliderContainer}
        onLayout={onLayout}
        {...panResponder.panHandlers}
      >
        <View
          style={[
            styles.complete,
            {
              width: `${progressPourcentage}%`,
              backgroundColor: COLORS.primary,
            },
          ]}
        ></View>
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
