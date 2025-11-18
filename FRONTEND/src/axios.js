
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.125:6045', 
  timeout: 10000,
});


api.interceptors.request.use(config => {
  const token = localStorage.getItem('TOKEN');
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
});

export default api;
