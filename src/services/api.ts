import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.empleaplus.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
