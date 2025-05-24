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
import {usePlaybackController} from "../../hook";

interface MediaPlayerProps {
  answer: Answer;
}

const MEDIA_LOCATION = "../../assets/";

const MediaPlayer: React.FC<MediaPlayerProps> = ({ answer }) => {

  const audioSource = require("../../assets/wavwarehouse.mp3");
  const player = useAudioPlayer(audioSource);


  const maxDuration: number =
    player.duration || durationsToSecond(answer?.duration || "");

  //TODO : ALERT if the duration and answer.duration is incorrect

  const { isPaused,
    position,
    playPause,
    seek,
    stop,
    handleOnComplete,} = usePlaybackController(player);
  

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
