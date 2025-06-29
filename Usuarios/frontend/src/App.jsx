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
  const [showRegister, setShowRegister] = useState(false)
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

  const handleLogin = async (username, password) => {
    try {
      // ✅ USAR POST (no GET)
      const res = await api.post('/users/login', { username, password });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token); // Guarda token
        setIsLoggedIn(true);
      } else {
        alert('Usuário ou senha inválidos');
      }
    } catch (err) {
      alert('Erro ao fazer login');
      console.error(err);
    }
  };

  const handleRegister = async (name, email, password) => {
  try {
    const res = await api.post('/users/register', { name, email, password });

    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      setShowRegister(false);
    } else {
      alert('Erro ao registrar usuário');
    }
  } catch (err) {
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
