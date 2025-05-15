import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import * as Crypto from "expo-crypto";

function generateHexKey(): string {
  const array = new Uint8Array(4);
  Crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const useAudioRecording = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async (idAnswer: string) => {
    try {
      if (!recording) return;

      const recordingsDir = FileSystem.documentDirectory + "recordings/";
      await FileSystem.makeDirectoryAsync(recordingsDir, {
        intermediates: true,
      });

      await recording.stopAndUnloadAsync();
      const sourceUri = recording.getURI();
      if (!sourceUri) throw new Error("No URI from recording");

      const idAnswer = generateHexKey(); // Or from backend
      const filePath = `${recordingsDir}${idAnswer}.m4a`;

      const status = await recording.stopAndUnloadAsync();
      const tempUri = recording.getURI();

      if (tempUri) {
        await FileSystem.moveAsync({ from: tempUri, to: filePath });
        console.log("Saved to:", filePath);
      }

      setRecording(null);

      // You can now save `destinationUri` to your Answer object
      return tempUri;
    } catch (err) {
      console.error("Failed to stop or save recording", err);
    }
  };

  return { startRecording, stopRecording };
};
