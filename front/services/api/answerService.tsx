// api/services/subjectService.js
import { Answer } from "../../models";
import { apiConfig } from "../config";

const answerEndpoint = "answers";
const answerURL = `${apiConfig.baseURL}/${answerEndpoint}`;

const answerService = {
  getAnswers: async () => {
    try {
      const url = answerURL;
      const response = await fetch(url, {
        method: "GET",
        headers: apiConfig.headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status}-${errorData.error}`);
      }

      const data = await response.json();
      console.log("Response Status:", data);
      return data;
    } catch (error) {
      console.error("Error fetching all answers:", error);
      throw error;
    }
  },


  createAnswer: async (answer:Answer) =>
  {
    try {
      const url = answerURL;
      const response = await fetch(url, {
        method: "POST",
        headers: apiConfig.headers,
        body: JSON.stringify({
          idAnswer: answer.idAnswer,
          file_location: answer.file_location,
          duration: answer.duration,
          idSubject: answer.subject.idSubject,
          review: answer.review,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status}-${errorData.error}`);
      }

      const data = await response.json();
      console.log("Response Status:", data);
      return data;
    } catch (error) {
      console.error("Error fetching all answers:", error);
      throw error;
    }
  },

  deleteAnswer: async (idAnswer: string) => {
    const url = answerURL + "/" + idAnswer;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: apiConfig.headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status}-${errorData.error}`);
      }

      const data = await response.json();
      console.log("Response Status:", data);
      return data;
    } catch (error) {
      console.error("Error fetching all answers:", error);
      throw error;
    }
  },

  patchAnswer: async (idAnswer: string, review?: string, file_location?:string, duration?:string) => {
    try {
      const url = answerURL;
      const response = await fetch(url, {
        method: "PATCH",
        headers: apiConfig.headers,
        body: JSON.stringify({
          idAnswer: idAnswer, 
          review: review,
          file_location : file_location, 
          duration: duration,
        })
      });

      if (response.status === 304) {
      console.log("No changes - Not Modified");
      return null;
    }
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status}-${errorData.error}`);
      }

      const data = await response.json();
      console.log("Response Status:", data);
      return data;
    } catch (error) {
      console.error("Error patching answers:", error);
      throw error;
    }
  },
};

export default answerService;
