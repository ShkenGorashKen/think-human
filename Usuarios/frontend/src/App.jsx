import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import BeneficiariosScreen from './screens/BeneficiariosScreen';
import Navbar from './components/Navbar';
import api from './services/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [beneficiarios, setBeneficiarios] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      api.get('/beneficiarios')
        .then(res => setBeneficiarios(res.data))
        .catch(err => {
          console.error('Erro ao buscar beneficiários:', err);
          setBeneficiarios([]);
        });
    }
  }, [isLoggedIn]);

  const handleLogin = async (email, password) => {
    try {
      const res = await api.post('/users/login', { email, password });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setIsLoggedIn(true);
      } else {
        alert('Usuário ou senha inválidos');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao fazer login');
      console.error(err);
    }
  };

  const handleRegister = async (username, email, password) => {
  try {
    // Enviar solicitud POST al backend con los datos del formulario
    const res = await api.post('/users/register', { username, email, password });

    // Si se recibió un token, guardar en localStorage y loguear el usuario
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);  // 🔐 Guarda el token JWT
      setIsLoggedIn(true);                            // ✅ Usuario logueado
      setShowRegister(false);                         // 👈 Cierra la tela de cadastro
    } else {
      alert('Erro ao registrar usuário');             // ⚠️ Algo inesperado ocurrió
    }
  } catch (err) {
    // Mostrar el mensaje de error que devuelve el backend, o genérico si no existe
    alert(err.response?.data?.error || 'Erro ao registrar usuário');
  }
};


  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

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
    );
  }

  return (
    <Router>
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<DashboardScreen beneficiarios={beneficiarios} />} />
        <Route path="/beneficiarios" element={<BeneficiariosScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
