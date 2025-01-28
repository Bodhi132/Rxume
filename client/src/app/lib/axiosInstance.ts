import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Your FastAPI URL
});

export default axiosInstance;
