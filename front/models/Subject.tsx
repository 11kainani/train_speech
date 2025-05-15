export enum SubjectType {
    NONE = "none",
    PROMPT = "prompt",
    QUESTION = "question",
    UNASSIGNED = "unassigned",
  };
  
export type Subject = {
    idSubject: string;
    description: string; 
    createdAt?: string; 
    updatedAt?: string;
  };

export interface SubjectResponse {
    subject?: Subject
}