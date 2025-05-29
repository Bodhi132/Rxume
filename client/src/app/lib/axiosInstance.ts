import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8000', // Your FastAPI URL
  baseURL:'https://rxume.onrender.com'
});

export default axiosInstance;
