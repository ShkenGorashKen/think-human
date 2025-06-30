// src/screens/DashboardScreen.jsx

// 📦 Importa React y componentes gráficos desde 'recharts'.
// 📦 Importa o React e os componentes gráficos do 'recharts'.
import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts'

// 🎨 Colores personalizados para los gráficos de barras y pastel.
// 🎨 Cores personalizadas para os gráficos de barras e pizza.
const BAR_COLORS = ['#4F46E5', '#A78BFA', '#C4B5FD', '#C084FC', '#9371FF', '#D8B4FE']
const PIE_COLORS = ['#4F46E5', '#A78BFA', '#C4B5FD']
const MAX_BENEFICIARIOS = 100 // Límite para el gráfico de progreso

// 🎯 Componente principal del dashboard (tablero de visualización).
// 🎯 Componente principal do dashboard (painel de visualização).
export default function DashboardScreen({ beneficiarios, onLogout }) {
  // Agrupa beneficiarios por tipo de ayuda y situación social.
  // Agrupa beneficiários por tipo de ajuda e situação social.
  const tipoData = contarPorCampo(beneficiarios, 'tipoDeAjuda')
  const situData = contarPorCampo(beneficiarios, 'situacaoSocial')
  const total    = beneficiarios.length
  const percent  = Math.min(Math.round((total / MAX_BENEFICIARIOS) * 100), 100)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* 🧮 Total de beneficiarios */}
        {/* 🧮 Total de beneficiários */}
        <p className="text-gray-600 text-lg mb-4">
          Total de Beneficiários:{' '}
          <span className="font-bold text-gray-900">{total}</span>
        </p>

        {/* 📊 Sección de gráficos y progreso */}
        {/* 📊 Seção de gráficos e progresso */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* 📘 Gráfico de Barras: Tipo de Ayuda */}
          {/* 📘 Gráfico de Barras: Tipo de Ajuda */}
          <div className="bg-white p-6 rounded-lg shadow h-96">
            <h2 className="text-xs uppercase text-gray-500 mb-4">
              Beneficiários por Tipo de Ajuda
            </h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tipoData} margin={{ top: 10, bottom: 20 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#374151', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: '#374151', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ marginTop: 16 }}
                  payload={tipoData.map((entry, idx) => ({
                    id: entry.name,
                    value: entry.name,
                    type: 'square',
                    color: BAR_COLORS[idx % BAR_COLORS.length]
                  }))}
                />
                <Bar dataKey="value" barSize={30} radius={[6, 6, 0, 0]}>
                  {tipoData.map((_, idx) => (
                    <Cell key={`cell-${idx}`} fill={BAR_COLORS[idx % BAR_COLORS.length]} />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="top"
                    style={{ fill: '#374151', fontSize: 12 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 🟣 Gráfico de Pastel: Situación Social */}
          {/* 🟣 Gráfico de Pizza: Situação Social */}
          <div className="bg-white p-6 rounded-lg shadow h-96">
            <h2 className="text-xs uppercase text-gray-500 mb-4">
              Beneficiários por Situação Social
            </h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={situData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {situData.map((_, idx) => (
                    <Cell key={`slice-${idx}`} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ marginTop: 16 }}
                  payload={situData.map((entry, idx) => ({
                    id: entry.name,
                    value: entry.name,
                    type: 'square',
                    color: PIE_COLORS[idx % PIE_COLORS.length]
                  }))}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 📈 Barra de Progreso General */}
          {/* 📈 Barra de Progresso Geral */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xs uppercase text-gray-500 mb-2">
              Progresso Total de Beneficiários
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-purple-600 transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="text-sm text-gray-700 mt-2">
              {total} / {MAX_BENEFICIARIOS} Beneficiários ({percent}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// 🔧 Función auxiliar para agrupar datos por clave y contar ocurrencias.
// 🔧 Função auxiliar para agrupar dados por chave e contar ocorrências.
function contarPorCampo(data, campo) {
  const mapa = {}
  data.forEach(item => {
    const key = item[campo] || 'Não informado'
    mapa[key] = (mapa[key] || 0) + 1
  })
  return Object.entries(mapa).map(([name, value]) => ({ name, value }))
}
