import { create } from "zustand";
import { Subject } from "../models";
import { subjectService } from "../services";

interface SubjectStore {
  subjects: Subject[];
  isLoading: boolean;
  setSubjects: (subjects: Subject[]) => void;
  updateSubject: (updatedSubject: Subject) => void;
  fetchSubjects: () => void;
  deleteSubject: (id: string) => void;
  createSubject: (newSubject: Subject) => void;
}

export const useSubjectStore = create<SubjectStore>((set, get) => ({
  subjects: [],
  isLoading: false,

  setSubjects: (subjects: Subject[]) => set({ subjects }),

  getSubject: (id: string): Subject | undefined => {
    const { subjects } = get();
    return subjects.find((s) => s.idSubject === id);
  },

  updateSubject: (updatedSubject: Subject) => {
    set((state) => ({
      subjects: state.subjects.map((s) =>
        s.idSubject === updatedSubject.idSubject ? updatedSubject : s
      ),
    }));
  },

  fetchSubjects: async () => {
    try {
      set({ isLoading: false });
      const response = await subjectService.getSubjects();
      set({ subjects: response.subjects });
    } catch (error) {
      console.error("Failed to fetch subjects", error);
    } finally {
      set({ isLoading: true });
    }
  },

  deleteSubject: (id: string) => {
    set((state) => ({
      subjects: state.subjects.filter((a) => a.idSubject !== id),
    }));
  },

  createSubject: async (newSubject: Subject) => {
    set((state) => ({
      subjects: [...state.subjects, newSubject],
    }));
    console.log("Answer added successfully");
  },
}));

