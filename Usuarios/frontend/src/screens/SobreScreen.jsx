// src/screens/SobreScreen.jsx

// Importa React para poder usar JSX.
// Importa o React para poder usar JSX.
import React from 'react'

// Componente funcional que muestra la información "Sobre a Fundação".
// Componente funcional que exibe as informações "Sobre a Fundação".
function SobreScreen() {
  return (
    // Contenedor general con altura mínima de pantalla y padding.
// Contêiner geral com altura mínima de tela e espaçamento interno.
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Caja central con fondo blanco y estilo tipo tarjeta. */}
      {/* Caixa central com fundo branco e estilo cartão. */}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">

        {/* Título principal */}
        {/* Título principal */}
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Sobre a Fundação
        </h1>

        {/* Párrafo descriptivo sobre la misión. */}
        {/* Parágrafo descritivo sobre a missão. */}
        <p className="text-gray-700 leading-relaxed">
          A Think Human Foundation tem como missão oferecer suporte a pessoas em situação de vulnerabilidade
          social, por meio de programas educacionais, psicológicos e profissionais. Buscamos promover a inclusão,
          dignidade e autonomia das pessoas beneficiadas pelos nossos projetos.
        </p>

        {/* Párrafo con detalles de los programas ofrecidos. */}
        {/* Parágrafo com detalhes dos programas oferecidos. */}
        <p className="text-gray-700 mt-4 leading-relaxed">
          Nossos programas incluem distribuição de cestas básicas, acompanhamento psicológico gratuito, 
          treinamentos profissionalizantes e suporte educacional para crianças e adolescentes.
        </p>
      </div>
    </div>
  )
}

export default SobreScreen
