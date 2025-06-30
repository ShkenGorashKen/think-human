// src/services/api.js

// Importa Axios para hacer solicitudes HTTP.
// Importa o Axios para fazer requisições HTTP.
import axios from 'axios'

// 🔧 Crea una instancia personalizada de Axios con URL base.
// 🔧 Cria uma instância personalizada do Axios com URL base.
const api = axios.create({
  baseURL: 'http://localhost:3001', // Backend local
})

// =============================
// ✉️ Interceptor de Request
// =============================

// Agrega el token JWT al header Authorization si está presente.
// Adiciona o token JWT no cabeçalho Authorization se estiver presente.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // Lee el token desde el almacenamiento local
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` // Añade el token como "Bearer ..."
    }
    return config
  },
  (error) => Promise.reject(error) // Si hay error al configurar, lo rechaza.
)

// =============================
// ⚠️ Interceptor de Response
// =============================

// Detecta errores de autenticación y actúa automáticamente.
// Detecta erros de autenticação e age automaticamente.
api.interceptors.response.use(
  (response) => response, // Deja pasar respuestas exitosas.
  (error) => {
    // Si la API responde con error 403 (token inválido o expirado):
    // Se a API responder com erro 403 (token inválido ou expirado):
    if (error.response?.status === 403) {
      alert('Sessão expirada. Faça login novamente.') // Alerta al usuario
      localStorage.removeItem('token')               // Borra el token guardado
      window.location.reload()                       // Recarga la página para forzar login
    }
    return Promise.reject(error) // Reenvía el error a quien lo invocó
  }
)

// Exporta la instancia configurada para usar en otras partes.
// Exporta a instância configurada para uso em outras partes.
export default api
