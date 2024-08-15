// api/services/subjectService.js
import apiConfig from '../config/apiConfig';

const subjectEndpoint = "subject";

const getSubjects = async () => {
    try {
        const url = `${apiConfig.baseURL}/${subjectEndpoint}/all`;
        const response = await fetch(url, {
          method: 'GET',
          headers: apiConfig.headers,
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
    
        const data = await response.json();

        //console.log("Response Status:", data); 

        return data;

      } catch (error) {
        console.error('Error fetching all subjects:', error);
        throw error;
      }
};

export { getSubjects };
