// src/screens/CadastrarScreen.jsx
import React, { useState } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

const initialForm = {
  nome: '',
  tipoDeAjuda: '',
  situacaoSocial: ''
}

export default function CadastrarScreen() {
  const [form, setForm] = useState(initialForm)
  const [saving, setSaving] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // validación mínima
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
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          Cadastrar Beneficiário
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
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
          <button
            type="submit"
            disabled={saving}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded text-white ${
              saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'
            }`}
          >
            {saving
              ? (
                <>
                  <Spinner />
                  <span>Cadastrando…</span>
                </>
              )
              : <span>Cadastrar</span>
            }
          </button>
        </form>
      </div>
    </div>
  )
}
