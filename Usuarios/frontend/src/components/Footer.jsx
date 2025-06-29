import React from 'react';

function Footer() {
  return (
    <footer className="bg-blue-700 text-white text-center py-4 mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} Think Human Foundation. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;
