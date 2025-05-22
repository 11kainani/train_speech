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
  const [completionResetKey, setCompletionResetKey] = useState(0);

  const audioSource = require("../../assets/wavwarehouse.mp3");
  const player = useAudioPlayer(audioSource);

  // soundRef = player.currentStatus;

  const maxDuration: number =
    player.duration || durationsToSecond(answer?.answer_time || "");

  //TODO : ALERT if the duration and answer.answer_time is incorrect

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
        if (player.currentTime) {
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

  const handleOnComplete = async () => {
    clearIntervalIfNeeded();
    if (player.currentTime !== 0) {
      await player.seekTo(0);
    }
    player.pause();
    setIsPaused(true);
    setPosition(0);
    setCompletionResetKey((prev) => prev + 1);
  };

  const handleOffsetAudio = async (value: number) => {
    const newPosition = player.currentTime + value;
    if (newPosition >= maxDuration) {
      await handleOnComplete();
      return;
    }
    const safePosition = Math.max(newPosition, 0);
    await player.seekTo(safePosition);
    setPosition(safePosition);
  };
  return (
    <View style={styles.container}>
      <MediaSlider
        minimumValue={0}
        maximumValue={maxDuration}
        value={position}
        onValueChange={handleOffsetAudio}
        onComplete={handleOnComplete}
        resetCompletionTrigger={completionResetKey}
      />

      <View style={styles.mediaButton}>
        <IconButton
          onPress={() => handleOffsetAudio(-5)}
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
          onPress={() => handleOffsetAudio(5)}
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
