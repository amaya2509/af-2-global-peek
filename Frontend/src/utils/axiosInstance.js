import axios from 'axios';
import { getToken } from './tokenUtils';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
