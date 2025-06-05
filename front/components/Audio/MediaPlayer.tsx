import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Answer } from "../../models";
import { IconButton } from "../Button";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, DIMENSIONS, durationsToSecond } from "../../utils";
import { useAudioPlayer } from "expo-audio";
import { MediaSlider } from "../Display";
import { usePlaybackController } from "../../hook";
import { useAnswerStore } from "../../stores";

interface MediaPlayerProps {
  idAnswer: string;
  onSettingsPress?: (answer: Answer) => void;
  onSettingsLongPress?: (answer: Answer) => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({
  idAnswer,
  onSettingsLongPress,
  onSettingsPress,
}) => {
  const { deleteAnswer } = useAnswerStore();

  const audioSource = require("../../assets/wavwarehouse.mp3");

  const answerRequest = useAnswerStore().getAnswer(idAnswer);
  const answer = answerRequest?.answer;
  if (!answer) {
    //TODO show alert that answer wasn"t found
    return;
  }

 
  const player = useAudioPlayer(answer.file_location);
  player.volume = 10;
  console.log(player);
  const maxDuration: number =
    player.duration || durationsToSecond(answer.duration || "");

  //TODO : ALERT if the duration and answer.duration is incorrect

  const { isPaused, position, playPause, seek, stop, handleOnComplete } =
    usePlaybackController(player);

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

  return (
    <View style={styles.container}>
      <MediaSlider
        minimumValue={0}
        maximumValue={maxDuration}
        value={position}
        onValueChange={seek}
        onComplete={handleOnComplete}
      />

      <View style={styles.horizontalButtons}>
        <IconButton
          small={true}
          backgroundColor={COLORS.red}
          onPress={() => {
            console.log(answer.idAnswer);
            deleteAnswer(answer.idAnswer);
          }}
          icon={
            <Feather
              name="trash"
              size={DIMENSIONS.iconSize}
              color={COLORS.background}
            />
          }
        />

        <View style={styles.mediaButton}>
          <IconButton
            onPress={() => seek(-5)}
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
            onPress={playPause}
          />
          <IconButton
            small={true}
            onPress={() => seek(5)}
            icon={
              <MaterialIcons
                name="forward-5"
                size={DIMENSIONS.iconSize}
                color={COLORS.background}
              />
            }
          />
        </View>

        <IconButton
          onPress={() => onSettingsPress?.(answer)}
          onLongPress={() => onSettingsLongPress?.(answer)}
          small={true}
          icon={
            <Feather
              name="settings"
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
  },

  horizontalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: DIMENSIONS.margin,
  },
});

export default MediaPlayer;
