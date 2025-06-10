import { create } from "zustand";
import { Subject } from "../models";
import { subjectService } from "../services";

interface SubjectStore {
  subjects: Subject[];
  isLoading: boolean;
  answeredIds: string[];
  setSubjects: (subjects: Subject[]) => void;
  updateSubject: (updatedSubject: Subject) => void;
  fetchSubjects: () => void;
  deleteSubject: (id: string) => void;
  createSubject: (newSubject: Subject) => void;
  fetchAnsweredSubjects: () => Promise<void>;
}

export const useSubjectStore = create<SubjectStore>((set, get) => ({
  subjects: [],
  isLoading: false,
  answeredIds : [],

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
      set({ isLoading: true });
      const response = await subjectService.getSubjects();
      set({ subjects: response.subjects });
    } catch (error) {
      console.error("Failed to fetch subjects", error);
    } finally {
      set({ isLoading: false });
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

   fetchAnsweredSubjects: async () => {
    try {
      const response = await subjectService.getSubjectWithAnswer();
      const subjects: Subject[] = response.subjects;
      const ids = subjects.map((subject) => subject.idSubject);
      set({ answeredIds: ids });
    } catch (error) {
      console.error("Failed to fetch answered subject IDs:", error);
    }
  },
  setAnsweredAsAnswered: (id: string) => {
  set((state) => ({
    answeredIds: [...state.answeredIds, id],
  }));
},
//TODO : Counter method so that we can remove a subject(without answer ) from the list

}));
