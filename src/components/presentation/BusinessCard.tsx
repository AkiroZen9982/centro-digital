import { Clock, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Business } from '../../types';
import { getCategoryIcon } from '../../utils/categories';  // Asegúrate de importar esta función
import BusinessImage from '../../data/images'; // Asegúrate de que la ruta sea correcta

interface BusinessCardProps {
  business: Business;
  onFavorite: () => void;
  isFavorite: boolean;
}

export const BusinessCard = ({ business, onFavorite, isFavorite }: BusinessCardProps) => {
  // Obtén el icono de la categoría utilizando la función getCategoryIcon
  const CategoryIcon = getCategoryIcon(business.categoria);

  const imageUrl = `https://lweekzkloveifncmfsuq.supabase.co/storage/v1/object/public/images/business-${business.slug}.jpg`;

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
      <Link to={`/business/${business.id}`}>
        <div className="aspect-square relative overflow-hidden">
          {/* Pasar business y imageUrl al componente BusinessImage */}
          <BusinessImage business={business} imageUrl={imageUrl} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>
      
      <button
        onClick={(e) => {
          e.preventDefault();
          onFavorite();
        }}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all"
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
            {/* Aquí mostramos el icono junto con el nombre de la categoría */}
            <CategoryIcon className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{business.categoria}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{business.horario}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{business.direccion}</span>
          </div>
        </div>
      </div>
    </div>
  );
};