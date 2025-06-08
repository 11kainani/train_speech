import { Subject } from "./Subject"

export type Answer = {
    idAnswer: string, 
    file_location: string, 
    duration: string,
    review?: string, 
    subject : Subject, 
    createdAt? : string, 
    updatedAt? : string,
}

export type AnswerWithSubject = {
  answer: Answer;
  subject: Subject;
};