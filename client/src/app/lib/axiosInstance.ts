import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://rxume.onrender.com', // Your FastAPI URL
});

export default axiosInstance;
