// src/screens/CadastrarScreen.jsx

// Importa React y el hook useState para manejar estado local.
// Importa o React e o hook useState para gerenciar estado local.
import React, { useState } from 'react'

// Servicio para realizar peticiones HTTP a la API.
// Serviço para realizar requisições HTTP à API.
import api from '../services/api'

// Librería para mostrar notificaciones amigables.
// Biblioteca para exibir notificações amigáveis.
import { toast } from 'react-toastify'

// Componente reutilizable de carga.
// Componente reutilizável de carregamento.
import Spinner from '../components/Spinner'

// Estado inicial del formulario.
// Estado inicial do formulário.
const initialForm = {
  nome: '',
  tipoDeAjuda: '',
  situacaoSocial: ''
}

// Componente principal para registrar beneficiarios.
// Componente principal para cadastrar beneficiários.
export default function CadastrarScreen() {
  const [form, setForm] = useState(initialForm)
  const [saving, setSaving] = useState(false)

  // ⚙️ Actualiza los campos del formulario cuando el usuario escribe.
  // ⚙️ Atualiza os campos do formulário quando o usuário digita.
  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // 📤 Enviar formulario al backend.
  // 📤 Enviar formulário para o backend.
  const handleSubmit = async e => {
    e.preventDefault()

    // Validación mínima: todos los campos deben estar llenos.
    // Validação mínima: todos os campos devem estar preenchidos.
    if (!form.nome || !form.tipoDeAjuda || !form.situacaoSocial) {
      return toast.warn('Todos los campos son obligatorios')
    }

    setSaving(true)
    try {
      await api.post('/beneficiarios', form)
      toast.success('Beneficiario cadastrado com sucesso!')
      setForm(initialForm)
    } catch (err) {
      console.error(err)
      toast.error('Erro ao cadastrar beneficiário')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        
        {/* 🟦 Título del formulario */}
        {/* 🟦 Título do formulário */}
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          Cadastrar Beneficiário
        </h1>

        {/* 📝 Formulario de registro */}
        {/* 📝 Formulário de cadastro */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Campo: Nome */}
          {/* Campo: Nome */}
          <div>
            <label className="block mb-1 font-medium">Nome</label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
              placeholder="Nome completo"
              required
            />
          </div>

          {/* Campo: Tipo de Ajuda */}
          {/* Campo: Tipo de Ajuda */}
          <div>
            <label className="block mb-1 font-medium">Tipo de Ajuda</label>
            <input
              name="tipoDeAjuda"
              value={form.tipoDeAjuda}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
              placeholder="Ex: Alimentação, Medicamento..."
              required
            />
          </div>

          {/* Campo: Situação Social */}
          {/* Campo: Situação Social */}
          <div>
            <label className="block mb-1 font-medium">Situação Social</label>
            <select
              name="situacaoSocial"
              value={form.situacaoSocial}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
              required
            >
              <option value="">Selecione</option>
              <option value="Vulnerabilidade alta">Vulnerabilidade alta</option>
              <option value="Vulnerabilidade média">Vulnerabilidade média</option>
              <option value="Vulnerabilidade baixa">Vulnerabilidade baixa</option>
            </select>
          </div>

          {/* Botón: Cadastrar */}
          {/* Botão: Cadastrar */}
          <button
            type="submit"
            disabled={saving}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded text-white ${
              saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'
            }`}
          >
            {saving ? (
              <>
                <Spinner />
                <span>Cadastrando…</span>
              </>
            ) : (
              <span>Cadastrar</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
