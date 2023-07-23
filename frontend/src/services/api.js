import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://logincrud.fly.dev/api/',
});
