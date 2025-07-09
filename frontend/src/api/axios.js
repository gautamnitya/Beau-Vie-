import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // backend URL
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Gets token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
