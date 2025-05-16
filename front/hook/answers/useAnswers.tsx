import { useEffect, useState } from "react";
import { answerService } from "../../api";
import { Answer } from "../../models";

export const useAnswers =  (setLoading: (val: boolean) => void) => {
  const [data, setData] = useState<Answer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const answers = await answerService.getAnswers();
        setData(answers.answers);
      } catch (error) {
        console.error("Error fetching subject data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, setData, };
};
