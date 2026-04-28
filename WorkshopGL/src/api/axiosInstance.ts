import axios from 'axios';
import { Base_URL } from './config';


export const axiosInstance = axios.create({
  baseURL: Base_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.error('Unauthorized! Token expired or invalid.');
      } else if (status === 403) {
        console.error('Forbidden! You lack permissions.');
      } else if (status === 500) {
        console.error('Server error!');
      }
    } else if (error.request) {
      console.error('Network Error: No response received.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;