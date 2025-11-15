// src/config/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Flag pour éviter redirections multiples
let isRedirecting = false;

// Request interceptor - attach token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401 gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 && !isRedirecting) {
      isRedirecting = true;
      // Optionnel: show toast ou message d'erreur
      localStorage.removeItem('token');
      // attendre un petit délai pour éviter plusieurs redirections simultanées
      setTimeout(() => {
        window.location.href = '/login';
      }, 300);
    }
    return Promise.reject(error);
  }
);

export default api;
