import * as FileSystem from "expo-file-system";
import { generateIdKey, secondsToFormat } from "../../utils";
import { answerService } from "../api";
import { Subject } from "../../models";

const RECORD_DIR = FileSystem.documentDirectory + "recording/";

export const saveRecording = async (
  uri: string,
  subject: Subject,
  durationInSeconds: number
) => {
  try {
    const idAnswer = generateIdKey();
    const fileName = `recording-${idAnswer}.m4a`;
    const newPath = RECORD_DIR + fileName;

    await FileSystem.copyAsync({
      from: uri,
      to: newPath,
    });

    console.log("Recording saved to:", newPath);

    const result = await answerService.createAnswer(
      idAnswer,
      newPath,
      secondsToFormat(durationInSeconds),
      subject.idSubject
    );

    if (result) {
      console.log("Answer saved");
      // TODO: Alert user here or return success
    }
  } catch (error) {
    console.error("Error while saving recording:", error);
    // TODO: Alert user here
  }
};
