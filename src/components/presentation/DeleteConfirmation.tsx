import { X } from 'lucide-react'; // Importación del ícono de cierre
import { Business } from '../../types/'; // Importación del tipo Business

// Interfaz para los props del componente DeleteConfirmationModal
interface DeleteConfirmationModalProps {
  business: Business; // Información del negocio a eliminar
  isOpen: boolean; // Estado para saber si el modal está abierto
  onClose: () => void; // Función para cerrar el modal
  onConfirm: () => void; // Función para confirmar la eliminación
}

// Componente DeleteConfirmationModal
export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  business, // Prop que contiene la información del negocio
  isOpen, // Prop que indica si el modal está abierto o no
  onClose, // Función para cerrar el modal
  onConfirm, // Función para confirmar la eliminación
}) => {
  // Si el modal no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal de confirmación de eliminación */}
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Botón de cierre del modal */}
        <button
          onClick={onClose} // Al hacer click, se cierra el modal
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" /> {/* Ícono de cierre */}
        </button>

        {/* Título del modal */}
        <h2 className="text-xl font-semibold mb-4">Confirmar eliminación</h2>

        {/* Mensaje de advertencia */}
        <p className="text-gray-600 mb-6">
          ¿Estás seguro que deseas eliminar el negocio <span className="font-semibold">{business.nombre}</span>? 
          Esta acción no se puede deshacer.
        </p>

        {/* Contenedor de los botones de acción */}
        <div className="flex justify-end gap-3">
          {/* Botón de cancelar */}
          <button
            onClick={onClose} // Al hacer click, se cierra el modal sin hacer nada
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>

          {/* Botón de eliminar */}
          <button
            onClick={onConfirm} // Al hacer click, se confirma la eliminación del negocio
            className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
