import { Subject } from "./Subject"

export type Answer = {
    idAnswer: string, 
    file_location: string, 
    duration: string,
    review?: string, 
    subject : Subject, 
}

export type AnswerWithSubject = {
  answer: Answer;
  subject: Subject;
};