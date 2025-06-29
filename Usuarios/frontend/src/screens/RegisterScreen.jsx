import React, { useState } from 'react';

function RegisterScreen({ onRegister, onShowLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!username || !email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      await onRegister(username, email, password);
      setMessage('Usuário registrado com sucesso!');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message || 'Erro ao registrar usuário');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded shadow p-8">
        <h2 className="text-center text-xl font-bold text-gray-700 mb-6">Cadastro</h2>

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

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
            Cadastrar
          </button>
        </form>

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
  );
}

export default RegisterScreen;
