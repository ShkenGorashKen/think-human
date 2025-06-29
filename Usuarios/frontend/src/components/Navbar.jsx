import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Info, CirclePlus, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';

function Navbar({ onLogout }) {
  return (
    <header className="bg-blue-700 text-white px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <h1 className="text-xl font-bold">Think Human Foundation</h1>
      </div>

      <nav className="flex gap-4 flex-wrap items-center">
        <Link to="/" className="flex items-center gap-1 hover:underline">
          <Home size={18} /> Home
        </Link>
        <Link to="/beneficiarios" className="flex items-center gap-1 hover:underline">
          <Users size={18} /> Beneficiários
        </Link>
        <Link to="/sobre" className="flex items-center gap-1 hover:underline">
          <Info size={18} /> Sobre
        </Link>
        <Link to="/cadastrar" className="flex items-center gap-1 hover:underline">
          <CirclePlus size={18} /> Cadastrar
        </Link>
        <button
          onClick={onLogout}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          type="button"
        >
          <LogOut size={18} /> Sair
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
