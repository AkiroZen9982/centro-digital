import { Search } from 'lucide-react';
import { memo } from 'react';

// Interfaz que define las propiedades del componente de búsqueda
interface SearchBarProps {
  value: string;          // Valor actual del campo de búsqueda
  onChange: (value: string) => void;  // Función para manejar cambios en la búsqueda
}

// Componente de barra de búsqueda con memorización para optimizar rendimiento
export const SearchBar = memo(({ value, onChange }: SearchBarProps) => {
  return (
    // Contenedor principal con ancho máximo y centrado
    <div className="relative w-full max-w-xl mx-auto">
      {/* Campo de entrada de texto para búsqueda */}
      <input
        type="text"
        value={value} // Valor controlado del input
        onChange={e => onChange(e.target.value)}  // Manejador de cambios
        placeholder="Buscar negocio..."    // Texto de placeholder
        // Clases para estilizar el input con enfoque y responsive
        className="w-full px-4 py-2 pl-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-40"
      />
      {/* Ícono de búsqueda posicionado absolutamente dentro del input */}
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
    </div>
  );
});