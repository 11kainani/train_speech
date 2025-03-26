// src/api/config/apiConfig.js
import {API_KEY, API_URL,API_PORT} from '@env';


const apiConfig = {  
  baseURL: `${API_URL}:${API_PORT}`,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
};

export default apiConfig;
