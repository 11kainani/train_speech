// hooks/useSubjects.ts
import { useEffect, useState } from "react";
import { subjectService } from "../api";
import { Subject } from "../models/Subject";

export const useSubjects = (setLoading: (val:boolean)=> void) => {
  const [data, setData] = useState<Subject[]>([]);
  const [promptIds, setPromptIds] = useState<string[]>([]);
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [unassignedIds, setUnassignedIds] = useState<string[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [subjects, prompts, questions, unassigned] = await Promise.all([
          subjectService.getSubjects(),
          subjectService.getPrompts(),
          subjectService.getQuestions(),
          subjectService.getUnassignedSubjectIds(),
        ]);

        setData(subjects.subjects);
        setPromptIds(prompts.prompts.map((p: any) => p.idPrompt));
        setQuestionIds(questions.questions.map((q: any) => q.idQuestion));
        setUnassignedIds(unassigned.ids.map((u: any) => u.idSubject));
      } catch (err) {
        console.error("Error fetching subject data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    promptIds,
    questionIds,
    unassignedIds,
    setData,
    setPromptIds,
    setQuestionIds,
    setUnassignedIds,
  };
};
