import { create } from "zustand";
import { answerService } from "../services";
import { Answer } from "../models";

interface AnswerStore {
  answers: Answer[];
  isLoading: boolean;
  setAnswers: (answers: Answer[]) => void;
  getAnswer(idAnswer: string): Answer | undefined;
  updateAnswer: (updated: Answer) => void;
  fetchAnswers: () => Promise<void>;
  deleteAnswer: (id: string) => Promise<void>;
  createAnswer: (newAnswer: Answer) => Promise<void>;
}

export const useAnswerStore = create<AnswerStore>((set, get) => ({
  answers: [],
  isLoading: false,

  setAnswers: (answers: Answer[]) => set({ answers }),

  getAnswer: (id: string) => {
    const { answers } = get();
    return answers.find((a) => a.idAnswer === id);
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
    try {
      const response = await answerService.deleteAnswer(id);
      if (response) {
        console.log("Answer deleted successfully");
        set((state) => ({
          answers: state.answers.filter((a) => a.idAnswer !== id),
        }));
      } else {
        console.warn("Delete request returned no confirmation");
      }
    } catch (error) {
      console.error("Failed to delete answer", error);
      // TODO: Show toast or alert for error
    }
  },

  createAnswer: async (newAnswer: Answer) => {
    try {
      console.log("Crrrr", newAnswer);
      const created = await answerService.createAnswer(newAnswer);
      if (created) {
        set((state) => ({
          answers: [...state.answers, created],
        }));
        console.log("Answer added successfully");
      } else {
        console.warn("API did not return a valid answer object");
      }
    } catch (error) {
      console.error("Failed to add answer", error);
      // TODO: Add toast/alert here
    }
  },
}));
