import { MapPin, Clock, Pencil, Trash2, Home } from 'lucide-react'; // Iconos de 'lucide-react'
import { Business } from '../../types'; // Tipado de la interfaz Business
import BusinessImage from '../../data/images'; // Componente para mostrar la imagen del negocio

// Definición de las propiedades que el componente recibirá
interface BusinessCardProps {
  business: Business; // Información del negocio
  viewMode: 'grid' | 'list'; // Modo de vista (en cuadrícula o lista)
  onEdit: (business: Business) => void; // Función para editar el negocio
  onDelete: (business: Business) => void; // Función para eliminar el negocio
}

// Componente BusinessCard
export const BusinessCard: React.FC<BusinessCardProps> = ({ business, viewMode, onEdit, onDelete }) => {
  // URL de la imagen del negocio basada en el slug
  const imageUrl = `https://epriqvuqygtntgabedhf.supabase.co/storage/v1/object/public/images/business-${business.slug}.webp`;
  
  // Determina la clase de estado según si el negocio está activo o inactivo
  const statusClass = business.activo ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
  const statusText = business.activo ? 'Activo' : 'Inactivo';

  // Vista en modo "grid" (cuadrícula)
  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden">
        <div className="relative w-full aspect-video bg-gray-100">
          {/* Componente para la imagen del negocio */}
          <BusinessImage business={business} imageUrl={imageUrl} />
          
          {/* Estado del negocio (Activo/Inactivo) */}
          <div className={`absolute top-3 left-3 p-2 bg-white rounded-md font-semibold ${statusClass}`}>
            {statusText}
          </div>
        </div>

        <div className="p-4">
          {/* Nombre del negocio */}
          <h3 className="text-lg font-semibold text-gray-800">{business.nombre}</h3>
          {/* Categoría del negocio */}
          <p className="text-sm text-gray-500">{business.categoria}</p>
          
          <div className="mt-4 space-y-2">
            {/* Dirección del negocio */}
            <div className="flex items-center text-sm text-gray-600">
              <Home className="w-4 h-4 mr-2" />
              <span>{business.direccion}</span>
            </div>
            {/* Ciudad del negocio */}
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{business.ciudad}</span>
            </div>
            {/* Horario de trabajo del negocio */}
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>{business.horario}</span>
            </div>
          </div>
        </div>

        {/* Controles para editar y eliminar el negocio */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100">
          <button 
            onClick={() => onEdit(business)} // Llama a la función de edición al hacer clic
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Editar negocio" // Tooltip que muestra al pasar el mouse
          >
            <Pencil className="w-5 h-5" /> {/* Icono de editar */}
          </button>
          <button 
            onClick={() => onDelete(business)} // Llama a la función de eliminar al hacer clic
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
            title="Eliminar negocio" // Tooltip que muestra al pasar el mouse
          >
            <Trash2 className="w-5 h-5" /> {/* Icono de eliminar */}
          </button>
        </div>
      </div>
    );
  }

  // Vista en modo "list" (lista)
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        {/* Imagen del negocio en formato circular */}
        <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
          <BusinessImage business={business} imageUrl={imageUrl} />
        </div>
        
        <div>
          {/* Nombre del negocio */}
          <h3 className="text-xl font-semibold text-gray-800">{business.nombre}</h3>
          {/* Categoría del negocio */}
          <p className="text-sm text-gray-500">{business.categoria}</p>
          
          <div className="mt-2 text-sm text-gray-600">{business.direccion}</div> {/* Dirección */}
          <div className="mt-1 text-sm text-gray-600">{business.ciudad}</div> {/* Ciudad */}
          <div className="mt-2 text-sm text-gray-600">{business.horario}</div> {/* Horario */}
          
          {/* Estado del negocio */}
          <div className={`mt-4 text-sm font-semibold px-3 py-1 inline-block rounded-full ${statusClass}`}>
            {statusText}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Botón de editar */}
        <button 
          onClick={() => onEdit(business)} // Llama a la función de editar al hacer clic
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          title="Editar negocio" // Tooltip de edición
        >
          <Pencil className="w-5 h-5" />
        </button>

        {/* Botón de eliminar */}
        <button 
          onClick={() => onDelete(business)} // Llama a la función de eliminar al hacer clic
          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Eliminar negocio" // Tooltip de eliminación
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
