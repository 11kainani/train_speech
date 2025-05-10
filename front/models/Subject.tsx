export enum SubjectType {
    NONE = "none",
    PROMPT = "prompt",
    QUESTION = "question",
    UNASSIGNED = "unassigned",
  };
  
export interface Subject {
    idSubject: string;
    description: string; 
    createdAt?: string; 
    updatedAt?: string;
  };

export interface Prompt {
    idPrompt: string; 
    subject?: Subject;
};

export interface Question {
  idQuestion: string; 
  subject?: Subject; 
}

export interface PromptResponse {
  prompt: {
    idPrompt: string;
  };
  subject?: Subject
};

export interface QuestionResponse {
  prompt: {
    idPrompt: string;
  };
  subject?: Subject
};

export interface SubjectResponse {
    subject?: Subject
}