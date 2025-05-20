import { Subject } from "./Subject"

export type Answer = {
    idAnswer: string, 
    file_location: string, 
    answer_time: string,
    review?: string, 
    subject : Subject, 
}

