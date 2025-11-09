// axios.js - COLE ESTE ARQUIVO NA PASTA /src
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000' // Ajuste a porta se necessário
});

// ✅ Interceptor CORRETO - envia token automaticamente
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-access-token'] = token;
    }
    return config;
});

export default api;