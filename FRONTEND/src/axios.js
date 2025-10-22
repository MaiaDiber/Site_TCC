import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:6045',
    headers: {
        "x-access-token": localStorage.getItem("TOKEN")
    }
})

export default api;