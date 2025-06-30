// src/components/Navbar.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Users, Info, LogOut } from 'lucide-react'
import logo from '../assets/logo.png'

export default function Navbar({ onLogout }) {
  return (
    <header className="shadow-md">
      {/* Barra superior */}
      <div className="bg-blue-800 h-24 flex items-center">
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo + Título */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
            <h1 className="text-3xl font-semibold text-white">
              Think Human Foundation
            </h1>
          </div>
          {/* Botón “Sair” */}
          <button
            onClick={onLogout}
            type="button"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>

      {/* Barra inferior: enlaces más separados y grandes */}
      <nav className="bg-blue-700 text-white flex justify-center space-x-20 px-6 py-4">
        <Link
          to="/"
          className="flex flex-col items-center hover:text-blue-300 transition-colors"
        >
          <Home size={32} />
          <span className="mt-1 text-base">Home</span>
        </Link>
        <Link
          to="/beneficiarios"
          className="flex flex-col items-center hover:text-blue-300 transition-colors"
        >
          <Users size={32} />
          <span className="mt-1 text-base">Beneficiários</span>
        </Link>
        <Link
          to="/sobre"
          className="flex flex-col items-center hover:text-blue-300 transition-colors"
        >
          <Info size={32} />
          <span className="mt-1 text-base">Sobre</span>
        </Link>
      </nav>
    </header>
  )
}
