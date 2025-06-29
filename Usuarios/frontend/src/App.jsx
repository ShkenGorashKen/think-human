import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import BeneficiariosScreen from './screens/BeneficiariosScreen';
import Navbar from './components/Navbar';
import api from './services/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
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
