// src/screens/BeneficiariosScreen.jsx

// Importa React y hooks para manejar estado y ciclo de vida.
// Importa o React e os hooks para gerenciar estado e ciclo de vida.
import React, { useState, useEffect } from 'react'

// Servicio de API preconfigurado (baseURL y headers).
// Serviço de API pré-configurado (baseURL e headers).
import api from '../services/api'

// Biblioteca para mostrar mensajes flotantes.
// Biblioteca para exibir mensagens flutuantes.
import { toast } from 'react-toastify'

// Componente de carga (spinner).
// Componente de carregamento (spinner).
import Spinner from '../components/Spinner'

// Estructura inicial del formulario.
// Estrutura inicial do formulário.
const initialForm = {
  nombre: '',
  apellido: '',
  RG: '',
  fecha_nacimiento: '',
  direccion: '',
  email: '',
  telefono: '',
  tipoDeAjuda: '',
  situacaoSocial: ''
}

// Componente principal de la pantalla de beneficiarios.
// Componente principal da tela de beneficiários.
export default function BeneficiariosScreen() {
  const [beneficiarios, setBeneficiarios] = useState([])
  const [formData, setFormData] = useState(initialForm)
  const [editandoId, setEditandoId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Al cargar el componente, busca la lista de beneficiarios.
  // Ao carregar o componente, busca a lista de beneficiários.
  useEffect(() => {
    fetchBeneficiarios()
  }, [])

  // 🔄 Cargar beneficiarios desde la API.
  // 🔄 Carrega beneficiários da API.
  async function fetchBeneficiarios() {
    setLoading(true)
    try {
      const res = await api.get('/beneficiarios')
      setBeneficiarios(res.data)
    } catch (err) {
      toast.error('No se pudo cargar los beneficiarios')
    } finally {
      setLoading(false)
    }
  }

  // Actualiza el valor del formulario a medida que se escribe.
  // Atualiza os valores do formulário conforme o usuário digita.
  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Guardar nuevo o editar beneficiario existente.
  // Salva um novo ou edita um beneficiário existente.
  async function handleSubmit(e) {
    e.preventDefault()
    const empty = Object.entries(formData).some(([_, v]) => !v)
    if (empty) return toast.warn('Completa todos los campos')

    setSaving(true)
    try {
      if (editandoId) {
        await api.put(`/beneficiarios/${editandoId}`, formData)
        toast.success('Beneficiario actualizado')
      } else {
        await api.post('/beneficiarios', formData)
        toast.success('Beneficiario creado')
      }
      setFormData(initialForm)
      setEditandoId(null)
      fetchBeneficiarios()
    } catch (err) {
      toast.error('Error al guardar beneficiario')
    } finally {
      setSaving(false)
    }
  }

  // Llena el formulario con los datos de un beneficiario para editar.
  // Preenche o formulário com os dados de um beneficiário para edição.
  function handleEditar(b) {
    setFormData({
      nombre: b.nombre,
      apellido: b.apellido,
      RG: b.RG,
      fecha_nacimiento: b.fecha_nacimiento,
      direccion: b.direccion,
      email: b.email,
      telefono: b.telefono,
      tipoDeAjuda: b.tipoDeAjuda,
      situacaoSocial: b.situacaoSocial
    })
    setEditandoId(b.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Elimina un beneficiario con confirmación.
  // Remove um beneficiário com confirmação.
  async function handleExcluir(id) {
    if (!window.confirm('¿Eliminar este beneficiario?')) return
    setLoading(true)
    try {
      await api.delete(`/beneficiarios/${id}`)
      toast.info('Beneficiario eliminado')
      fetchBeneficiarios()
    } catch {
      toast.error('No se pudo eliminar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Gestionar Beneficiarios</h2>

      {/* 📝 Formulario para crear o editar beneficiarios */}
      {/* 📝 Formulário para criar ou editar beneficiários */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow"
      >
        {/* Mapea campos de forma dinámica */}
        {/* Mapeia campos de forma dinâmica */}
        {[
          { label: 'Nombre', name: 'nombre', type: 'text' },
          { label: 'Apellido', name: 'apellido', type: 'text' },
          { label: 'RG', name: 'RG', type: 'text' },
          { label: 'Fecha Nacimiento', name: 'fecha_nacimiento', type: 'date' },
          { label: 'Dirección', name: 'direccion', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Teléfono', name: 'telefono', type: 'tel' },
          { label: 'Tipo de Ayuda', name: 'tipoDeAjuda', type: 'text' },
          { label: 'Situación Social', name: 'situacaoSocial', type: 'text' }
        ].map(({ label, name, type }) => (
          <div key={name} className="flex flex-col">
            <label className="mb-1 font-medium">{label}</label>
            <input
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              className="border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>
        ))}

        {/* Botón de acción guardar o crear */}
        {/* Botão de ação: salvar ou criar */}
        <button
          type="submit"
          disabled={saving}
          className={`md:col-span-2 py-2 rounded text-white ${
            saving
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {saving ? <Spinner /> : editandoId ? 'Guardar Cambios' : 'Crear Beneficiario'}
        </button>
      </form>

      {/* 📋 Tabla con la lista de beneficiarios */}
      {/* 📋 Tabela com a lista de beneficiários */}
      <section>
        <h3 className="text-xl font-medium mb-4">Lista de Beneficiarios</h3>
        {loading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    'Nombre',
                    'Apellido',
                    'RG',
                    'Nacimiento',
                    'Dirección',
                    'Email',
                    'Teléfono',
                    'Ayuda',
                    'Situación',
                    'Acciones'
                  ].map(h => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {beneficiarios.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{b.nombre}</td>
                    <td className="px-4 py-2">{b.apellido}</td>
                    <td className="px-4 py-2">{b.RG}</td>
                    <td className="px-4 py-2">{b.fecha_nacimiento}</td>
                    <td className="px-4 py-2">{b.direccion}</td>
                    <td className="px-4 py-2">{b.email}</td>
                    <td className="px-4 py-2">{b.telefono}</td>
                    <td className="px-4 py-2">{b.tipoDeAjuda}</td>
                    <td className="px-4 py-2">{b.situacaoSocial}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEditar(b)}
                        className="text-blue-600 hover:underline"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleExcluir(b.id)}
                        className="text-red-600 hover:underline"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
