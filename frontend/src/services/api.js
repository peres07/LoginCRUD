import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://logincrud-backend.onrender.com/api/',
});
