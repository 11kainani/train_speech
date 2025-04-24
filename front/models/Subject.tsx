export enum SubjectType {
    NONE = "none",
    PROMPT = "prompt",
    QUESTION = "question",
  };
  
export interface Subject {
    idSubject: string;
    description: string; 
  };

export interface Prompt {
    idPrompt: string; 
    description?: string;
};

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