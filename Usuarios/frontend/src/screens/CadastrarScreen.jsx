import React, { useState } from 'react';
import api from '../services/api';

function CadastrarScreen() {
  const [form, setForm] = useState({
    nome: '',
    tipoDeAjuda: '',
    situacaoSocial: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/beneficiarios', form);
      alert('Beneficiário cadastrado com sucesso!');
      setForm({ nome: '', tipoDeAjuda: '', situacaoSocial: '' });
    } catch (err) {
      alert('Erro ao cadastrar beneficiário');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Cadastrar Beneficiário</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Nome"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            name="tipoDeAjuda"
            value={form.tipoDeAjuda}
            onChange={handleChange}
            placeholder="Tipo de Ajuda"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <select
            name="situacaoSocial"
            value={form.situacaoSocial}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          >
            <option value="">Selecione a Situação Social</option>
            <option value="Vulnerabilidade alta">Vulnerabilidade alta</option>
            <option value="Vulnerabilidade média">Vulnerabilidade média</option>
            <option value="Vulnerabilidade baixa">Vulnerabilidade baixa</option>
          </select>
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastrarScreen;
