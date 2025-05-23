// api/services/subjectService.js
import apiConfig from "../config/apiConfig";

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

  createAnswer: async (idAnswer: string, file_location:string, duration:string, idSubject: string, review?: string) => {
    try {
      const url = answerURL;
      const response = await fetch(url, {
        method: "POST",
        headers: apiConfig.headers,
        body: JSON.stringify({ idAnswer: idAnswer, file_location:file_location, duration:duration,idSubject:idSubject}),
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
};

export default answerService;
