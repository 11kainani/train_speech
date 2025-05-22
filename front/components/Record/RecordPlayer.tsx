import { View, StyleSheet, Text, Alert, Button } from "react-native";
import { COLORS, DIMENSIONS, secondsToFormat } from "../../utils";
import { IconButton, PanelButton, SmallConfirmButton } from "../Button";
import { useEffect, useRef, useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import {
  AudioModule,
  RecordingPresets,
  useAudioPlayer,
  useAudioRecorder,
} from "expo-audio";

import * as FileSystem from "expo-file-system";
import { useNavigation, useRouter } from "expo-router";
const MAX_RECORD_TIME = 300;

import { InteractionManager } from "react-native";

//TODO : Save file transition
const RecordPlayer = () => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Start recording
  const startRecording = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
    setIsRecording(true);
    setIsPaused(false);
  };

  // Pause recording
  const pauseRecording = () => {
    audioRecorder.pause();
    setIsPaused(true);
  };

  // Stop recording
  const stopRecording = async () => {
    if (audioRecorder.isRecording) {
      await audioRecorder.stop();
    }
    setIsRecording(false);
    setIsPaused(false);
    clearIntervalIfNeeded();
    setRecordTimer(0);
  };

  const clearIntervalIfNeeded = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleRecord = async () => {
    if (!isRecording) {
      // Fresh start
      await audioRecorder.prepareToRecordAsync();
      await audioRecorder.record();
      setIsRecording(true);
      setIsPaused(false);
    } else if (isPaused) {
      // Resume
      await audioRecorder.record();
      setIsPaused(false);
    } else {
      // Pause
      await audioRecorder.pause();
      setIsPaused(true);
    }
  };

  const handleCancel = async () => {
    clearIntervalIfNeeded();
    setRecordTimer(0);
    await stopRecording();

    InteractionManager.runAfterInteractions(() => {
      router.replace("/record");
    });
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
    console.log(isPaused, "Pause", isRecording,"Recording");
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRecordTimer((prev) => {
          if (prev >= MAX_RECORD_TIME) {
            alert("Time Limit exceeded");
            stopRecording(); // async but fire and forget
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearIntervalIfNeeded();
      setIsPaused(true);
      
      if (!isRecording) {
        setRecordTimer(0);
      }
    }

    return () => clearIntervalIfNeeded();
  }, [isRecording, isPaused]);

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
    } else {
      return (
        <Feather
          name="pause"
          size={DIMENSIONS.iconSizeXLarge}
          color={COLORS.secondary}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.recordTime}>
        {secondsToFormat(recordTimer)} / {secondsToFormat(MAX_RECORD_TIME)}
      </Text>
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
        <SmallConfirmButton
          title="Cancel"
          style={styles.deleteText}
          onPress={handleCancel}
        />
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
