import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts';

const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF00FF'];

function DashboardScreen({ beneficiarios, onLogout }) {
  const tipoDeAjuda = contarPorCampo(beneficiarios, 'tipoDeAjuda');
  const situacaoSocial = contarPorCampo(beneficiarios, 'situacaoSocial');

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Sair
          </button>
        </div>

        <p className="text-gray-600 text-lg mb-4">
          Total de Beneficiários: <strong>{beneficiarios.length}</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gráfico de Barras */}
          <div className="bg-gray-50 p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Por Tipo de Ajuda</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tipoDeAjuda}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Torta */}
          <div className="bg-gray-50 p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Por Situação Social</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={situacaoSocial}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {situacaoSocial.map((entry, index) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// Agrupa os dados por campo (tipoDeAjuda ou situacaoSocial)
function contarPorCampo(data, campo) {
  const resultado = {};
  data.forEach(item => {
    const valor = item[campo] || 'Não informado';
    resultado[valor] = (resultado[valor] || 0) + 1;
  });
  return Object.entries(resultado).map(([name, value]) => ({ name, value }));
}

export default DashboardScreen;
