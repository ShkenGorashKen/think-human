import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Interceptor de request: adiciona token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response: detecta token expirado
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      alert('Sessão expirada. Faça login novamente.');
      localStorage.removeItem('token');
      window.location.reload(); // recarga la página
    }
    return Promise.reject(error);
  }
);

export default api;
