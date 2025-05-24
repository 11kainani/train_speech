// hooks/useSubjects.ts
import { useEffect, useState } from "react";
import { subjectService } from "../../services";
import { Subject } from "../../models/Subject";

export const useSubjects = (setLoading: (val: boolean) => void) => {
  const [data, setData] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const subjects = await subjectService.getSubjects();

        setData(subjects.subjects);
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
    setData,
  };
};
 