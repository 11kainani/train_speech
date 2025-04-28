// api/services/subjectService.js
import apiConfig from '../config/apiConfig';

const subjectEndpoint = "subjects";


enum subjectType {
  PROMPT = "prompt",
  QUESTION= "question"
}
const subjectService = {

  /**
   * Fetches all subjects from the API.
   *
   * @async
   * @returns {Promise<Object>} A promise that resolves to the data containing all subjects.
   * @throws {Error} Throws an error if the API response is not ok or if there is a network issue.
   */
  getSubjects: async () => {
    try {
      const url = `${apiConfig.baseURL}/${subjectEndpoint}/`;
      console.log(url);
      const response = await fetch(url, {
        method: 'GET',
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
      console.error('Error fetching all subjects:', error);
      throw error;
    }
  },

  /**
   * Deletes a subject by ID.
   *
   * @async
   * @param {string} idSubject - The ID of the subject to delete.
   * @returns {Promise<Object>} A promise that resolves to the response data.
   * @throws {Error} Throws an error if the API request fails.
   */
  deleteSubject: async (idSubject: string) => {
    try {
      const url = `${apiConfig.baseURL}/${subjectEndpoint}/${idSubject}`
      const response = await fetch(url, {
        method: 'DELETE',
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
      console.error('Error deleting subject:', error);
      throw error;
    }
  },

  getPrompts:async () => {
    try {
      const url = `${apiConfig.baseURL}/${subjectEndpoint}/prompts`
      const response = await fetch(url, {
        method: 'GET', 
        headers: apiConfig.headers,
      });

      if(!response.ok)
      {
        const errorData = await response.json();
        throw new Error(`${response.status}-${errorData.error}`);
      }

      const data = await response.json();
      console.log("Response Status:", data); 
      return data;

      
      
    } catch (error) {
      console.error('Error retreiving prompts:', error);
      throw error;
    }

  },

  getQuestions:async () => {
    try {
      const url = `${apiConfig.baseURL}/${subjectEndpoint}/questions`
      const response = await fetch(url, {
        method: 'GET', 
        headers: apiConfig.headers,
      });

      if(!response.ok)
      {
        const errorData = await response.json();
        throw new Error(`${response.status}-${errorData.error}`);
      }

      const data = await response.json();
      console.log("Response Status:", data); 
      return data;

      
      
    } catch (error) {
      console.error('Error retreiving questions:', error);
      throw error;
    }

  },

  createSubject: async (description: string) => {
    try {

      const url = `${apiConfig.baseURL}/${subjectEndpoint}/`
      const response = await fetch(url, {
        method: 'POST', 
        headers: apiConfig.headers,
        body: JSON.stringify({description: description}),
      });

      if(!response.ok)
        {
          const errorData = await response.json();
          throw new Error(`${response.status}-${errorData.error}`);
        }
  
        const data = await response.json();
        console.log("Response Status:", data); 
        return data;
      
    } catch (error) {
      console.error('Error creating subject:', error);
      throw error;
    }


  },

  createQuestion: async (description : string) => {
    try {

      const url = `${apiConfig.baseURL}/${subjectEndpoint}/questions/`
      const response = await fetch(url, {
        method: 'POST', 
        headers: apiConfig.headers,
        body: JSON.stringify({description: description}),
      });

      if(!response.ok)
        {
          const errorData = await response.json();
          throw new Error(`${response.status}-${errorData.error}`);
        }
  
        const data = await response.json();
        console.log("Response Status:", data); 
        return data;
      
    } catch (error) {
      console.error('Error creating questions:', error);
      throw error;
    }

  },

  createPrompt: async (description : string) => {
    try {

      const url = `${apiConfig.baseURL}/${subjectEndpoint}/prompts/`
      const response = await fetch(url, {
        method: 'POST', 
        headers: apiConfig.headers,
        body: JSON.stringify({description: description}),
      });

      if(!response.ok)
        {
          const errorData = await response.json();
          throw new Error(`${response.status}-${errorData.error}`);
        }
  
        const data = await response.json();
        console.log("Response Status:", data); 
        return data;
      
    } catch (error) {
      console.error('Error creating questions', error);
      throw error;
    }

  }
};


export default subjectService;
