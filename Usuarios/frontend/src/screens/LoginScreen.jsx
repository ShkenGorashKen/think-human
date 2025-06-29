import React, { useState } from 'react';
import fundoLogin from '../assets/fundo-login.jpg'; // Asegúrate de que la imagen exista

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!username || !password) {
      setErro('Preencha todos os campos');
      return;
    }

    try {
      await onLogin(username, password);

      // ✅ Limpiar campos después de login exitoso
      setUsername('');
      setPassword('');
    } catch (err) {
      setErro('Erro ao fazer login');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Imagem lateral esquerda */}
      <div className="w-1/2 h-full">
        <img src={fundoLogin} alt="Fundo" className="object-cover w-full h-full" />
      </div>

      {/* Formulário lado direito */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white rounded shadow p-8">
          <h2 className="text-center text-xl font-bold text-gray-700 mb-2">Gerenciar Beneficiários</h2>
          <h3 className="text-center text-lg text-gray-500 mb-6">Think Human Foundation</h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Usuário (admin)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <input
              type="password"
              placeholder="Senha (admin)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-3 py-2 rounded"
            />

            {erro && <p className="text-red-500 text-sm">{erro}</p>}

            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
              Entrar
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Não tem uma conta? <span className="text-blue-600 hover:underline cursor-pointer">Cadastre-se</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
