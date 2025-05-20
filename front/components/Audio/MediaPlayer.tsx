import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Answer } from "../../models";
import { IconButton } from "../Button";
import {
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS, DIMENSIONS, durationsToSecond } from "../../utils";
import { AudioPlayer, useAudioPlayer } from "expo-audio";
import { MediaSlider } from "../Display";

interface MediaPlayerProps {
  answer: Answer;
}

const MEDIA_LOCATION = "../../assets/";

const MediaPlayer: React.FC<MediaPlayerProps> = ({ answer }) => {
  const [isPaused, setIsPaused] = useState(true);
  const [position, setPosition] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const audioSource = require("../../assets/wavwarehouse.mp3");
  const player = useAudioPlayer(audioSource);

  // soundRef = player.currentStatus;

  const maxDuration: number = durationsToSecond(answer?.answer_time || "") || 1;

  const handlePlayTrigger = () => {
    if (player.playing) {
      player.pause();
      setIsPaused(true);
    } else {
      player.play();
      setIsPaused(false);
    }
  };

  const renderPausePlayButton = () => {
    if (!isPaused) {
      return (
        <Ionicons
          name="pause"
          size={DIMENSIONS.iconSize}
          color={COLORS.background}
        />
      );
    }

    return (
      <Feather
        name="play-circle"
        size={DIMENSIONS.iconSize}
        color={COLORS.background}
      />
    );
  };

  useEffect(() => {
    console.log(MEDIA_LOCATION + answer.file_location);
    if (!isPaused) {
      intervalRef.current = setInterval(async () => {
        if (player.currentStatus.currentTime) {
          setPosition(player.currentStatus.currentTime);
        }
      }, 100);
    } else {
      clearIntervalIfNeeded();
    }

    return;
  }, [isPaused]);

  const clearIntervalIfNeeded = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  return (
    <View style={styles.container}>
      <MediaSlider
        minimumValue={0}
        maximumValue={maxDuration}
        value={position}
        onValueChange={function (newValue: number): void {
          console.log("Function not implemented.");
        }}
        onComplete={function (): void {
          console.log("Function not implemented.");
        }}
      />

      <View style={styles.mediaButton}>
     
        <IconButton
          small={true}
          icon={
            <MaterialIcons
              name="replay-5"
              size={DIMENSIONS.iconSize}
              color={COLORS.background}
            />
          }
        />
        <IconButton
          small={true}
          icon={renderPausePlayButton()}
          onPress={handlePlayTrigger}
        />
        <IconButton
          small={true}
          icon={
            <MaterialIcons
              name="forward-5"
              size={DIMENSIONS.iconSize}
              color={COLORS.background}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: DIMENSIONS.marginSmall,
    width: "100%",
    alignSelf: "center",
    flexDirection: "column",
  },
  content: {},

  mediaButton: {
    alignSelf: "center",
    flexDirection: "row",
    marginTop: DIMENSIONS.margin,

  },
});

export default MediaPlayer;
