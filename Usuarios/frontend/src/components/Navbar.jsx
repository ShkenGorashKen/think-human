import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onLogout }) {
  return (
    <nav style={{ background: '#003366', padding: '10px', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={require('../assets/logo.png')} alt="Logo" width={100} />
        <h1 style={{ marginLeft: '10px' }}>Think Human Foundation</h1>
      </div>
      <div>
        <Link to="/" style={{ color: 'white', marginRight: '15px' }}>Dashboard</Link>
        <Link to="/beneficiarios" style={{ color: 'white', marginRight: '15px' }}>Beneficiários</Link>
        <button onClick={onLogout}>Sair</button>
      </div>
    </nav>
  );
}

export default Navbar;
