import { Subject } from "./Subject"

type Answer = {
    idAnswer: string, 
    file_location?: string, 
    answer_time?: string,
    idSubject: string, 
    review?: string, 
    subject? : Subject, 
}