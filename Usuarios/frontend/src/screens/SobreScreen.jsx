import React from 'react';

function SobreScreen() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Sobre a Fundação</h1>
        <p className="text-gray-700 leading-relaxed">
          A Think Human Foundation tem como missão oferecer suporte a pessoas em situação de vulnerabilidade
          social, por meio de programas educacionais, psicológicos e profissionais. Buscamos promover a inclusão,
          dignidade e autonomia das pessoas beneficiadas pelos nossos projetos.
        </p>
        <p className="text-gray-700 mt-4 leading-relaxed">
          Nossos programas incluem distribuição de cestas básicas, acompanhamento psicológico gratuito, 
          treinamentos profissionalizantes e suporte educacional para crianças e adolescentes.
        </p>
      </div>
    </div>
  );
}

export default SobreScreen;
