// src/App.jsx

// Importa React y hooks necesarios.
// Importa o React e os hooks necessários.
import React, { useState, useEffect } from 'react'

// Importa el router principal de React Router v6.
// Importa o roteador principal do React Router v6.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Importa las pantallas principales.
// Importa as telas principais.
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import DashboardScreen from './screens/DashboardScreen'
import BeneficiariosScreen from './screens/BeneficiariosScreen'
import CadastrarScreen from './screens/CadastrarScreen'
import SobreScreen from './screens/SobreScreen'

// Navbar de navegación superior.
// Navbar de navegação superior.
import Navbar from './components/Navbar'

// Footer persistente.
// Rodapé persistente.
import Footer from './components/Footer'

// Cliente de API Axios configurado.
// Cliente da API Axios configurado.
import api from './services/api'

// Componente principal de la aplicación.
// Componente principal da aplicação.
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [beneficiarios, setBeneficiarios] = useState([])

  // Verifica si hay token al iniciar y actualiza el estado.
// Verifica se há token ao iniciar e atualiza o estado.
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) setIsLoggedIn(true)
  }, [])

  // Si está logueado, carga los beneficiarios.
// Se estiver logado, carrega os beneficiários.
  useEffect(() => {
    if (isLoggedIn) {
      api.get('/beneficiarios')
        .then(res => setBeneficiarios(res.data))
        .catch(err => {
          console.error('Erro ao buscar beneficiários:', err)
          setBeneficiarios([])
        })
    }
  }, [isLoggedIn])

  // Maneja login y guarda el token.
// Lida com o login e salva o token.
  const handleLogin = async (email, password) => {
    try {
      const res = await api.post('/users/login', { email, password })
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        setIsLoggedIn(true)
      } else {
        alert('Usuário ou senha inválidos')
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao fazer login')
      console.error(err)
    }
  }

  // Maneja registro y guarda token si fue exitoso.
// Lida com o registro e salva o token se for bem-sucedido.
  const handleRegister = async (username, email, password) => {
    try {
      const res = await api.post('/users/register', { username, email, password })
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        setIsLoggedIn(true)
        setShowRegister(false)
      } else {
        alert('Erro ao registrar usuário')
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao registrar usuário')
    }
  }

  // Cierra sesión y limpia el token.
// Faz logout e remove o token.
  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('token')
  }

  // Si no está logueado, muestra login o registro.
// Se não estiver logado, exibe login ou cadastro.
  if (!isLoggedIn) {
    return showRegister ? (
      <RegisterScreen
        onRegister={handleRegister}
        onShowLogin={() => setShowRegister(false)}
      />
    ) : (
      <LoginScreen
        onLogin={handleLogin}
        onShowRegister={() => setShowRegister(true)}
      />
    )
  }

  // Si está logueado, muestra navegación completa.
// Se estiver logado, exibe navegação completa.
  return (
    <Router>
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<DashboardScreen beneficiarios={beneficiarios} />} />
        <Route path="/beneficiarios" element={<BeneficiariosScreen />} />
        <Route path="/sobre" element={<SobreScreen />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
