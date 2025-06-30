// src/components/Spinner.jsx

// Componente funcional para mostrar un ícono de carga animado.
// Componente funcional para exibir um ícone de carregamento animado.
export default function Spinner() {
  return (
    // Contenedor centrado con padding para separación.
    // Contêiner centralizado com padding para espaçamento.
    <div className="flex items-center justify-center p-4">
      {/* Círculo animado que gira infinitamente.
          Usa clases de Tailwind:
          - w-6 h-6: tamaño
          - border-4: grosor del borde
          - border-blue-500: color del borde
          - border-t-transparent: hace el borde superior invisible
          - rounded-full: lo hace redondo
          - animate-spin: aplica la animación de rotación */}
      
      {/* Círculo animado que gira infinitamente.
          Usa classes do Tailwind:
          - w-6 h-6: tamanho
          - border-4: largura da borda
          - border-blue-500: cor da borda
          - border-t-transparent: torna a borda superior invisível
          - rounded-full: deixa o elemento redondo
          - animate-spin: aplica a animação de rotação */}
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
