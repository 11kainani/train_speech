// api/services/subjectService.js
import apiConfig from '../config/apiConfig';

const subjectEndpoint = "subject";


/**
 * Fetches all subjects from the API.
 *
 * This function sends a GET request to the subjects endpoint to retrieve
 * all available subjects. If the request is successful, it returns the
 * parsed JSON data. Otherwise, it throws an error.
 *
 * @async
 * @function
 * @throws {Error} Throws an error if the API response is not ok or if there is a network issue.
 * @returns {Promise<Object>} A promise that resolves to the data containing all subjects.
 */
export const getSubjects = async () => {
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

        console.log("Response Status:", data); 

        return data;

      } catch (error) {
        console.error('Error fetching all subjects:', error);
        throw error;
      }
};

