// src/screens/LoginScreen.jsx

// Importa React y useState para manejar estado local.
// Importa o React e useState para gerenciar estado local.
import React, { useState } from 'react'

// Imagen de fondo lateral (asegúrate de que exista en la ruta).
// Imagem de fundo lateral (confirme que o arquivo existe no caminho).
import fundoLogin from '../assets/fundo-login.jpg'

function LoginScreen({ onLogin, onShowRegister }) {
  // Estados para campos del formulario y errores.
  // Estados para os campos do formulário e mensagens de erro.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')

  // Maneja el envío del formulario de login.
  // Lida com o envio do formulário de login.
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')

    // Validación básica de campos vacíos.
    // Validação básica de campos vazios.
    if (!email || !password) {
      setErro('Preencha todos os campos')
      return
    }

    try {
      await onLogin(email, password)

      // Limpia los campos si el login fue exitoso.
      // Limpa os campos se o login for bem-sucedido.
      setEmail('')
      setPassword('')
    } catch (err) {
      setErro('Erro ao fazer login')
    }
  }

  return (
    <div className="flex h-screen">
      {/* 📷 Lado izquierdo con imagen de fondo */}
      {/* 📷 Lado esquerdo com imagem de fundo */}
      <div className="w-1/2 h-full">
        <img src={fundoLogin} alt="Fundo" className="object-cover w-full h-full" />
      </div>

      {/* 📄 Lado derecho: formulario de acceso */}
      {/* 📄 Lado direito: formulário de acesso */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white rounded shadow p-8">
          
          {/* Títulos */}
          {/* Títulos */}
          <h2 className="text-center text-xl font-bold text-gray-700 mb-2">
            Gerenciar Beneficiários
          </h2>
          <h3 className="text-center text-lg text-gray-500 mb-6">
            Think Human Foundation
          </h3>

          {/* 📝 Formulario */}
          {/* 📝 Formulário */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <input
              type="password"
              placeholder="Senha"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-3 py-2 rounded"
            />

            {/* Mensaje de error si ocurre */}
            {/* Mensagem de erro se ocorrer */}
            {erro && <p className="text-red-500 text-sm">{erro}</p>}

            {/* Botón para enviar login */}
            {/* Botão para enviar login */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Entrar
            </button>
          </form>

          {/* Enlace para registrarse */}
          {/* Link para se cadastrar */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Não tem uma conta?{' '}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={onShowRegister}
            >
              Cadastre-se
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
