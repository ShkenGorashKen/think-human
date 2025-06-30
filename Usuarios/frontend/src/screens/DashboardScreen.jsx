// src/screens/DashboardScreen.jsx
import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,          // ← Importa LabelList aquí
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts'

const BAR_COLORS = [
  '#4F46E5', '#A78BFA', '#C4B5FD',
  '#C084FC', '#9371FF', '#D8B4FE'
]
const PIE_COLORS = ['#4F46E5', '#A78BFA', '#C4B5FD']
const MAX_BENEFICIARIOS = 100

export default function DashboardScreen({ beneficiarios, onLogout }) {
  // Agrupa datos por campo
  const tipoData = contarPorCampo(beneficiarios, 'tipoDeAjuda')
  const situData = contarPorCampo(beneficiarios, 'situacaoSocial')
  const total    = beneficiarios.length
  const percent  = Math.min(Math.round((total / MAX_BENEFICIARIOS) * 100), 100)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          
          
        </div>

        {/* Total de beneficiarios */}
        <p className="text-gray-600 text-lg mb-4">
          Total de Beneficiários:{' '}
          <span className="font-bold text-gray-900">{total}</span>
        </p>

        {/* Gráficas y barra de progreso */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Gráfico de Barras */}
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
                {/* Leyenda con tipos de ayuda */}
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
                <Bar
                  dataKey="value"
                  barSize={30}
                  radius={[6, 6, 0, 0]}
                >
                  {tipoData.map((_, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={BAR_COLORS[idx % BAR_COLORS.length]}
                    />
                  ))}
                  {/* Muestra la cantidad encima de cada barra */}
                  <LabelList
                    dataKey="value"
                    position="top"
                    style={{ fill: '#374151', fontSize: 12 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Pie */}
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
                    <Cell
                      key={`slice-${idx}`}
                      fill={PIE_COLORS[idx % PIE_COLORS.length]}
                    />
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

          {/* Barra de Progreso */}
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

// Función helper para agrupar datos
function contarPorCampo(data, campo) {
  const mapa = {}
  data.forEach(item => {
    const key = item[campo] || 'Não informado'
    mapa[key] = (mapa[key] || 0) + 1
  })
  return Object.entries(mapa).map(([name, value]) => ({ name, value }))
}
