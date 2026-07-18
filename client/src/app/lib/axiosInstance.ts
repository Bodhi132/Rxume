import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000', // Your FastAPI URL
  // baseURL:'https://rxume.onrender.com'
});

export default axiosInstance;
