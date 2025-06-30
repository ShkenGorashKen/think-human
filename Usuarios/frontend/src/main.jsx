// src/index.jsx

// Importa React para trabajar con JSX y componentes.
// Importa o React para trabalhar com JSX e componentes.
import React from 'react'

// Importa el nuevo método de creación de raíz de React 18+.
// Importa o novo método de criação de root do React 18+.
import ReactDOM from 'react-dom/client'

// Importa el componente principal de la aplicación.
// Importa o componente principal da aplicação.
import App from './App'

// 🔁 Crea el punto de montaje de la app React enlazado al div con id="root".
// 🔁 Cria o ponto de montagem da aplicação React vinculado ao div com id="root".
const root = ReactDOM.createRoot(document.getElementById('root'))

// 🚀 Renderiza el componente App en modo estándar (sin StrictMode aquí).
// 🚀 Renderiza o componente App em modo padrão (sem StrictMode aqui).
root.render(<App />)
