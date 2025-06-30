// src/components/Navbar.jsx

// Importa React para crear componentes funcionales.
// Importa o React para criar componentes funcionais.
import React from 'react'

// Importa Link para navegación interna sin recargar la página.
// Importa Link para navegação interna sem recarregar a página.
import { Link } from 'react-router-dom'

// Íconos modernos desde lucide-react.
// Ícones modernos do pacote lucide-react.
import { Home, Users, Info, LogOut } from 'lucide-react'

// Logo de la organización Think Human Foundation.
// Logo da organização Think Human Foundation.
import logo from '../assets/logo.png'

// Componente principal: Navbar con logout y menú de navegación.
// Componente principal: Navbar com logout e menu de navegação.
export default function Navbar({ onLogout }) {
  return (
    <header className="shadow-md">
      {/* 🔵 Barra superior con logo y botón de salir */}
      {/* 🔵 Barra superior com logo e botão de sair */}
      <div className="bg-blue-800 h-24 flex items-center">
        <div className="container mx-auto flex items-center justify-between px-6">
          
          {/* 📛 Sección izquierda: logo + nombre */}
          {/* 📛 Seção esquerda: logo + nome */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
            <h1 className="text-3xl font-semibold text-white">
              Think Human Foundation
            </h1>
          </div>

          {/* 🔴 Botón para cerrar sesión */}
          {/* 🔴 Botão para encerrar sessão */}
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

      {/* 🔽 Barra de navegación inferior con íconos grandes */}
      {/* 🔽 Barra de navegação inferior com ícones grandes */}
      <nav className="bg-blue-700 text-white flex justify-center space-x-20 px-6 py-4">
        {/* Enlace: Home */}
        {/* Link: Home */}
        <Link
          to="/"
          className="flex flex-col items-center hover:text-blue-300 transition-colors"
        >
          <Home size={32} />
          <span className="mt-1 text-base">Home</span>
        </Link>

        {/* Enlace: Beneficiarios */}
        {/* Link: Beneficiários */}
        <Link
          to="/beneficiarios"
          className="flex flex-col items-center hover:text-blue-300 transition-colors"
        >
          <Users size={32} />
          <span className="mt-1 text-base">Beneficiários</span>
        </Link>

        {/* Enlace: Sobre nosotros */}
        {/* Link: Sobre nós */}
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
