import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Category } from '../../types';
import { useRef } from 'react';
import { categories } from '../../utils/categories';

interface CategoryCarouselProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const CategoryCarousel = ({
  // categories,
  selectedCategory,
  onSelectCategory,
}: CategoryCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  
  const scrollContainer = (direction: 'left' | 'right') => {
    const container = carouselRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getCategoryButtonClass = (categorySlug: string | null) => {
    return `flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full ${
      selectedCategory === categorySlug
        ? 'bg-blue-500 text-white'
        : 'bg-gray-100 hover:bg-gray-200'
    }`;
  };

  return (
    <div className="relative w-full">
      <div
        ref={carouselRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide py-4 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <button
          onClick={() => onSelectCategory(null)}
          aria-selected={selectedCategory === null}
          className={getCategoryButtonClass(null)}
        >
          All Categories
        </button>

        {categories.map((category) => {
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.slug)}
              aria-selected={selectedCategory === category.slug}
              className={getCategoryButtonClass(category.slug)}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Gradientes en los extremos */}
      <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent"></div>
      <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent"></div>

      {/* Boton izquierdo */}
      <button
        onClick={() => scrollContainer('left')}
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 border rounded-full shadow-lg hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Boton derecho */}
      <button
        onClick={() => scrollContainer('right')}
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 border rounded-full shadow-lg hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};
