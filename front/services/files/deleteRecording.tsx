import * as FileSystem from "expo-file-system";
import { answerService } from "../api";

const RECORD_DIR = FileSystem.documentDirectory + "recording/";

export const deleteRecording = async ({
  fileUri,
  idAnswer,
}: {
  fileUri?: string;
  idAnswer?: string;
}) => {
  try {
    // 1. Delete local file
    if (fileUri) {
      await FileSystem.deleteAsync(fileUri, { idempotent: true });
      //TODO Alert file deleted
      console.log(`Deleted local file: ${fileUri}`);
    }

    // 2. Delete from API
    if (idAnswer) {
       //TODO Alert file deleted from database
      const response = await answerService.deleteAnswer(idAnswer);

      if (response) {
        console.log(`Deleted backend recording: ${idAnswer}`);
      }
    }

    return true;
  } catch (error) {
    console.error("Failed to delete recording:", error);
    return false;
  }
};

//TODO Folder checkup that autodeletes recording that aren't associated to answers and vise versa