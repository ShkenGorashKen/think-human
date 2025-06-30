// src/index.jsx

// Importa React para poder renderizar componentes.
// Importa o React para renderizar componentes.
import React from 'react'

// Importa ReactDOM para trabajar con el DOM real.
// Importa o ReactDOM para manipular o DOM real.
import ReactDOM from 'react-dom/client'

// Componente raíz de la aplicación.
// Componente raiz da aplicação.
import App from './App'

// Estilos globales personalizados (Tailwind u otros).
// Estilos globais personalizados (Tailwind ou outros).
import './index.css'

// Contenedor de notificaciones con Toast.
// Contêiner de notificações com Toast.
import { ToastContainer } from 'react-toastify'

// Estilos predeterminados de react-toastify.
// Estilos padrão do react-toastify.
import 'react-toastify/dist/ReactToastify.css'

// 📦 Crea la raíz de la aplicación conectada al div con id 'root'.
// 📦 Cria a raiz da aplicação conectada ao div com id 'root'.
const root = ReactDOM.createRoot(document.getElementById('root'))

// 🚀 Renderiza la app dentro del modo estricto.
// 🚀 Renderiza o app dentro do modo estrito.
root.render(
  <React.StrictMode>
    {/* Componente principal */}
    {/* Componente principal */}
    <App />

    {/* Contenedor de toasts para mensajes globales */}
    {/* Contêiner de toasts para mensagens globais */}
    <ToastContainer
      position="top-right"   // Posición arriba a la derecha
      autoClose={3000}       // Se cierra automáticamente a los 3 segundos
      hideProgressBar        // Oculta la barra de progreso
    />
  </React.StrictMode>
)
