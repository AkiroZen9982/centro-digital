import { Clock, MapPin, Heart, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Business } from '../../types';
import { getCategoryIcon } from '../../utils/categories';
import BusinessImage from '../../data/images';

interface BusinessCardProps {
  business: Business;
  onFavorite: () => void;
  isFavorite: boolean;
}

export const BusinessCard = ({ business, onFavorite, isFavorite }: BusinessCardProps) => {
  // Obtén el icono de la categoría utilizando la función getCategoryIcon
  const CategoryIcon = getCategoryIcon(business.categoria);

  const imageUrl = `https://epriqvuqygtntgabedhf.supabase.co/storage/v1/object/public/images/business-${business.slug}.webp`;

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
      <Link to={`/business/${business.id}`}>
        <div className="aspect-square relative overflow-hidden">
          {/* Aquí definimos un tamaño fijo para la imagen usando el width y height */}
          <BusinessImage business={business} imageUrl={imageUrl} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      {/* Botón de favoritos con un tamaño fijo para evitar el salto */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onFavorite();
        }}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all"
        style={{ width: '36px', height: '36px' }}
      >
        <Heart
          className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
        />
      </button>

      <div className="p-5">
        <Link to={`/business/${business.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
            {business.nombre}
          </h3>
        </Link>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            {/* Icono de la categoría */}
            <CategoryIcon className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{business.categoria}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{business.horario}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Home className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{business.direccion}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{business.ciudad}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
