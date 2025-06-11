import { Alert } from "react-native";
import {
  ensureRecordingDirExists,
  generateIdKey,
  secondsToFormat,
} from "../../utils";
import { useEffect, useRef, useState } from "react";
import { AudioModule, RecordingPresets, useAudioRecorder } from "expo-audio";
import * as FileSystem from "expo-file-system";
import { Answer, Subject } from "../../models";
import { useAnswerStore } from "../../stores";
import { answerService } from "../../services";
const RECORD_DIR = FileSystem.documentDirectory + "recording/";
const MAX_RECORD_TIME = 300;

//TODO Add loading screen between the click of record and the start of record , diable the button betwwen
export const useRecordAudio = (subject: Subject) => {
  const audioRecorder = useAudioRecorder(RecordingPresets.LOW_QUALITY);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { createAnswer } = useAnswerStore();

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied");
      }
    })();
  }, []);

  useEffect(() => {
    ensureRecordingDirExists(RECORD_DIR);
  }, []);

  const stopRecording = async (save: boolean = true) => {
    if (audioRecorder.isRecording) {
      await audioRecorder.stop();
    }

    setIsRecording(false);
    setIsPaused(false);
    clearIntervalIfNeeded();
    setRecordTimer(0);
    if (save) {
      try {
        let retries = 0;
        let uri: string | null = null;

        while (retries < 10) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          if (audioRecorder.uri) {
            const info = await FileSystem.getInfoAsync(audioRecorder.uri);
            if (info.exists) {
              uri = audioRecorder.uri;
              break;
            }
          }
          retries++;
        }

        if (!uri) {
          //TODO : Stop the recording and display an alert
          console.error("Failed to retrieve valid URI after recording.");
          return;
        }

        //TODO Orginize the saving process so it is not done directly here but in a pure fonction then use store
        const idAnswer = generateIdKey();
        const fileName = `recording-${idAnswer}.m4a`;
        const newPath = RECORD_DIR + fileName;

        await FileSystem.copyAsync({
          from: uri,
          to: newPath,
        });

        console.log("Recording saved to:", newPath);
        console.log("Description", subject);

        const answerToCreate: Answer = {
          idAnswer: idAnswer,
          duration: secondsToFormat(recordTimer),
          subject: subject,
          file_location: newPath,
        };
        await answerService.createAnswer(answerToCreate);
        createAnswer(answerToCreate);
      } catch (error) {
        console.error("Error while copying recording:", error);
      }
    }
  };

  const clearIntervalIfNeeded = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleRecord = async () => {
    if (!isRecording) {
      //start
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      setIsRecording(true);
      setIsPaused(false);
    } else if (isPaused) {
      // Resume
      audioRecorder.record();
      setIsPaused(false);
    } else {
      // Pause
      audioRecorder.pause();
      setIsPaused(true);
    }
  };

  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRecordTimer((prev) => {
          if (prev >= MAX_RECORD_TIME) {
            alert("Time Limit exceeded");
            stopRecording();
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

  return {
    recordTimer,
    audioRecorder,
    isRecording,
    isPaused,
    setRecordTimer,
    clearIntervalIfNeeded,
    handleRecord,
    stopRecording,
  };
};
