// src/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6045', // 👈 muda pra sua porta do backend
  timeout: 10000,
});

// ✅ Interceptor para enviar token automaticamente
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
});

export default api;
