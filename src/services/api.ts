import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Solo añade el token si no es una ruta de auth
  if (token && !config.url?.startsWith("/auth")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});