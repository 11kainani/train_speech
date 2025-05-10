// hooks/useAnsweredSubjectIds.ts
import { useEffect, useState } from "react";
import { subjectService } from "../api"; // assuming subjectService has the API call
import { Subject } from "../models";

export const useAnsweredSubjectIds = () => {
  const [answeredIds, setAnsweredIds] = useState<string[]>([]);
  

  useEffect(() => {
    const fetchAnswered = async () => {
      try {
        const response  = await subjectService.getSubjectWithAnswer(); 
        const subjects: Subject[] = response.subjects;
        const ids =  subjects.map((subject: Subject) => subject.idSubject);
        console.log(ids);
        setAnsweredIds(ids);
      } catch (e) {
        console.error("Failed to fetch answered subject IDs:", e);
      } finally {
    
      }
    };

    fetchAnswered();
  }, []);

  return { answeredIds };
};
