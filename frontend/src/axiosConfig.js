import axios from 'axios';

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // crucial for sending cookies
});
  
export default instance;