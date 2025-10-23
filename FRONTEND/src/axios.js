import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:6045',
    
})

export default api;