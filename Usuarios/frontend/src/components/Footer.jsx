// Importa React para poder usar JSX y crear componentes.
// Importa o React para usar JSX e criar componentes.
import React from 'react';

// Componente funcional llamado Footer que devuelve un pie de página estilizado.
// Componente funcional chamado Footer que retorna um rodapé estilizado.
function Footer() {
  return (
    // Etiqueta <footer> con clases Tailwind para estilos.
    // Tag <footer> com classes Tailwind para estilos.
    <footer className="bg-blue-700 text-white text-center py-4 mt-10">
      
      {/* Parágrafo con el texto del copyright del año actual. */}
      {/* Parágrafo com o texto de direitos autorais com o ano atual. */}
      <p className="text-sm">
        © {new Date().getFullYear()} Think Human Foundation. Todos os direitos reservados.
      </p>
    </footer>
  );
}

// Exporta el componente para que pueda usarse en otras partes.
// Exporta o componente para que possa ser usado em outras partes.
export default Footer;
