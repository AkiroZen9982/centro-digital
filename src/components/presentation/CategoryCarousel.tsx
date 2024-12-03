import { ChevronLeft, ChevronRight } from 'lucide-react'; // Importación de íconos de flecha
import { Category } from '../../types'; // Importación del tipo Category
import { useRef } from 'react'; // Hook useRef para hacer referencia al contenedor
import { categories } from '../../utils/categories'; // Importación de las categorías

// Interfaz para los props del componente CategoryCarousel
interface CategoryCarouselProps {
  categories: Category[]; // Lista de categorías
  selectedCategory: string | null; // Categoría seleccionada
  onSelectCategory: (category: string | null) => void; // Función para seleccionar una categoría
}

// Componente CategoryCarousel
export const CategoryCarousel = ({
  // categories, // Descomentado si se utiliza la propiedad 'categories' pasada como prop
  selectedCategory, // Prop que contiene la categoría seleccionada
  onSelectCategory, // Función para manejar la selección de categoría
}: CategoryCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement | null>(null); // Referencia al contenedor del carrusel

  // Función para desplazar el contenedor del carrusel a la izquierda o derecha
  const scrollContainer = (direction: 'left' | 'right') => {
    const container = carouselRef.current;
    if (container) {
      const scrollAmount = 200; // Distancia que se desplaza por clic
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount, // Desplazamiento según la dirección
        behavior: 'smooth', // Desplazamiento suave
      });
    }
  };

  // Función para determinar las clases del botón según la categoría seleccionada
  const getCategoryButtonClass = (categorySlug: string | null) => {
    return `flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full ${
      selectedCategory === categorySlug
        ? 'bg-blue-500 text-white' // Si está seleccionada, usar fondo azul
        : 'bg-gray-100 hover:bg-gray-200' // Si no está seleccionada, fondo gris claro con hover
    }`;
  };

  return (
    <div className="relative w-full">
      {/* Contenedor del carrusel de categorías */}
      <div
        ref={carouselRef} // Referencia al contenedor del carrusel
        className="flex space-x-4 overflow-x-auto scrollbar-hide py-4 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Estilos personalizados para esconder la barra de desplazamiento
      >
        {/* Botón para ver todas las categorías */}
        <button
          onClick={() => onSelectCategory(null)} // Al hacer click, se selecciona "All Categories"
          aria-selected={selectedCategory === null} // Indica si está seleccionada
          className={getCategoryButtonClass(null)} // Aplica las clases según si está seleccionada
        >
          All Categories
        </button>

        {/* Mapeo de las categorías para crear un botón por cada una */}
        {categories.map((category) => {
          return (
            <button
              key={category.id} // Llave única para cada botón
              onClick={() => onSelectCategory(category.slug)} // Al hacer click, se selecciona la categoría
              aria-selected={selectedCategory === category.slug} // Indica si esta categoría está seleccionada
              className={getCategoryButtonClass(category.slug)} // Aplica las clases según si está seleccionada
            >
              {category.name} {/* Nombre de la categoría */}
            </button>
          );
        })}
      </div>

      {/* Gradientes en los extremos del carrusel */}
      <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent"></div>
      <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent"></div>

      {/* Botón para desplazar el carrusel a la izquierda */}
      <button
        onClick={() => scrollContainer('left')} // Al hacer click, desplaza el carrusel a la izquierda
        aria-label="Scroll left" // Descripción para accesibilidad
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 border rounded-full shadow-lg hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" /> {/* Ícono de flecha hacia la izquierda */}
      </button>

      {/* Botón para desplazar el carrusel a la derecha */}
      <button
        onClick={() => scrollContainer('right')} // Al hacer click, desplaza el carrusel a la derecha
        aria-label="Scroll right" // Descripción para accesibilidad
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 border rounded-full shadow-lg hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" /> {/* Ícono de flecha hacia la derecha */}
      </button>
    </div>
  );
};
