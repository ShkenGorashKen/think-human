// src/screens/RegisterScreen.jsx

// Importa React y useState para manejar estado local.
// Importa React e useState para gerenciar estado local.
import React, { useState } from 'react'

// Componente funcional para registrar un nuevo usuario.
// Componente funcional para cadastrar um novo usuário.
function RegisterScreen({ onRegister, onShowLogin }) {
  // Definición de estados para campos y mensajes.
  // Definição de estados para campos e mensagens.
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // Maneja el envío del formulario.
  // Lida com o envio do formulário.
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    // Validación: todos los campos deben estar llenos.
    // Validação: todos os campos devem estar preenchidos.
    if (!username || !email || !password) {
      setError('Preencha todos os campos')
      return
    }

    try {
      // Intenta registrar el usuario llamando a onRegister.
      // Tenta cadastrar o usuário chamando onRegister.
      await onRegister(username, email, password)
      setMessage('Usuário registrado com sucesso!')
      setUsername('')
      setEmail('')
      setPassword('')
    } catch (err) {
      // Muestra el mensaje de error si falla.
      // Mostra a mensagem de erro se falhar.
      setError(err.message || 'Erro ao registrar usuário')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded shadow p-8">
        {/* Título del formulario */}
        {/* Título do formulário */}
        <h2 className="text-center text-xl font-bold text-gray-700 mb-6">Cadastro</h2>

        {/* Formulario de registro */}
        {/* Formulário de cadastro */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          {/* Mensajes de error y éxito */}
          {/* Mensagens de erro e sucesso */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}

          {/* Botón para enviar el formulario */}
          {/* Botão para enviar o formulário */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Cadastrar
          </button>
        </form>

        {/* Enlace para ir al login si ya tiene cuenta */}
        {/* Link para ir ao login se já tiver conta */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Já tem uma conta?{' '}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={onShowLogin}
          >
            Entrar
          </span>
        </p>
      </div>
    </div>
  )
}

export default RegisterScreen
