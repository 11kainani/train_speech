import { View, StyleSheet, Text, Alert, Button } from "react-native";
import { COLORS, DIMENSIONS } from "../../utils";
import { IconButton, PanelButton, SmallConfirmButton } from "../Button";
import { useEffect, useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { AudioModule, RecordingPresets, useAudioPlayer, useAudioRecorder } from "expo-audio";

import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

const RecordPlayer = () => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const audioSource = require('../../assets/wavwarehouse.mp3');

  const RECORDING_DIR = FileSystem.documentDirectory + "recordings/";

  const record = async () => {
    
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
    setIsRecording(true);
    setIsPaused(false);
  };

  const pauseRecord = async () => {
    await audioRecorder.pause();
    setIsPaused(true);
  };
  const stopRecording = async () => {
    // The recording will be available on `audioRecorder.uri`.
    console.log("url is here:", audioRecorder.uri);
    const fileName = `recording.m4a`;
    setIsRecording(false);
    setIsPaused(false);
    await audioRecorder.stop();
    
  };

  const handleRecord = async () => {
    if (!isRecording) {
      await record();
      setIsRecording(true);
    } else if (isPaused) {
      setIsPaused(false);
      await record();
    } else {
      setIsPaused(true);
      await pauseRecord();
    }
  };


  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied");
      }
    })();
  }, []);

  useEffect(() => {
    console.log(
      "isPaused:",
      isPaused,
      "isRecording:",
      isRecording,
      RECORDING_DIR
    );
    console.log(RECORDING_DIR)
  }, [isPaused, isRecording]);
const player = useAudioPlayer(audioSource);
  const renderRecordIcon = () => {
    if (!isRecording) {
      return (
        <Entypo
          name="controller-record"
          size={DIMENSIONS.iconSizeXLarge}
          color={COLORS.red}
        />
      );
    }
    if (isPaused) {
      return (
        <Feather
          name="play"
          size={DIMENSIONS.iconSizeXLarge}
          color={COLORS.secondary}
        />
      );
    }
    return (
      <Feather
        name="pause"
        size={DIMENSIONS.iconSizeXLarge}
        color={COLORS.secondary}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.recordTime}>00:00</Text>
      <IconButton
        backgroundColor={isRecording ? COLORS.primary : COLORS.red}
        onPress={handleRecord}
        icon={renderRecordIcon()}
      />

      <View style={styles.horizontal}>
        <PanelButton
          title="save"
          disable={!isRecording}
          style={styles.save}
          onPress={stopRecording}
        />
        <SmallConfirmButton title="delete" style={styles.deleteText} />
         <Button title="Play Sound" onPress={() => player.play()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "45%",
    width: "100%",
    backgroundColor: COLORS.secondary,
    padding: DIMENSIONS.paddingLarge,
    justifyContent: "space-between",
    alignItems: "center",
  },
  save: {},
  recordTime: {
    fontSize: DIMENSIONS.fontXLarge,
    fontWeight: "bold",
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // center main button by default
    width: "100%",
    position: "relative",
  },
  deleteText: {
    position: "absolute",
    right: 25,
    backgroundColor: COLORS.red,
  },
});
export default RecordPlayer;
