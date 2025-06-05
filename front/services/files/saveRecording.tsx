import * as FileSystem from "expo-file-system";
import { generateIdKey, secondsToFormat } from "../../utils";
import { Answer, Subject } from "../../models";
import { useAnswerStore } from "../../stores";

const RECORD_DIR = FileSystem.documentDirectory + "recording/";

export const saveRecording = async (
  uri: string,
  subject: Subject,
  durationInSeconds: number
) => {

   const {createAnswer} = useAnswerStore();
  try {
    const idAnswer = generateIdKey();
    const fileName = `recording-${idAnswer}.m4a`;
    const newPath = RECORD_DIR + fileName;

    await FileSystem.copyAsync({
      from: uri,
      to: newPath,
    });

    console.log("Recording saved to:", newPath);

    const answerToCreate : Answer = {
      idAnswer: idAnswer,
      duration:secondsToFormat(durationInSeconds),
      subject: subject,
      file_location: newPath,

    }
    await createAnswer(answerToCreate);

  
    
  } catch (error) {
    console.error("Error while saving recording:", error);
    // TODO: Alert user here
  }
};
