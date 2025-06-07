import { create } from "zustand";
import { answerService } from "../services";
import { Answer, AnswerWithSubject } from "../models";

interface AnswerStore {
  answers: Answer[];
  isLoading: boolean;
  setAnswers: (answers: Answer[]) => void;
  getAnswer(idAnswer: string): AnswerWithSubject | undefined;
  updateAnswer: (updated: Answer) => void;
  fetchAnswers: () => Promise<void>;
  deleteAnswer: (id: string) => Promise<void>;
  createAnswer: (newAnswer: Answer) => Promise<void>;
}

export const useAnswerStore = create<AnswerStore>((set, get) => ({
  answers: [],
  isLoading: false,

  setAnswers: (answers: Answer[]) => set({ answers }),

  getAnswer: (id: string): AnswerWithSubject | undefined => {
    const { answers } = get();
    const answer = answers.find((a) => a.idAnswer === id);

    if (!answer) return undefined;

    return {
      answer,
      subject: answer.subject,
    };
  },
  updateAnswer: (updated: Answer) =>
    set((state) => ({
      answers: state.answers.map((a) =>
        a.idAnswer === updated.idAnswer ? updated : a
      ),
    })),

  fetchAnswers: async () => {
    set({ isLoading: true });
    try {
      const response = await answerService.getAnswers();
      set({ answers: response.answers }); // ✅ Make sure this matches your actual API shape
    } catch (error) {
      console.error("Failed to fetch answers", error);
      // TODO: Show toast or alert for error
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAnswer: async (id: string) => {
    console.log("Answer deleted successfully");
    set((state) => ({
      answers: state.answers.filter((a) => a.idAnswer !== id),
    }));
  },

  createAnswer: async (newAnswer: Answer) => {
    set((state) => ({
      answers: [...state.answers, newAnswer],
    }));
    console.log("Answer added successfully");
  },
}));
