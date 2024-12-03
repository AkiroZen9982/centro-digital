import { X } from 'lucide-react';
import { Business } from '../../types/';
import { useState, useEffect } from 'react';

interface BusinessModalProps {
  business: Business;  // No es opcional, solo para editar un negocio
  isOpen: boolean;
  onClose: () => void;
  onSave: (business: Partial<Business>) => void;
}

export const BusinessModal: React.FC<BusinessModalProps> = ({ business, isOpen, onClose, onSave }) => {
  // Estado inicial del formulario basado en el negocio que se está editando
  const [form, setForm] = useState<Partial<Business>>({
    nombre: business?.nombre || '',
    descripcion: business?.descripcion || '',
    whatsapp: business?.whatsapp || '',
    facebook: business?.facebook || '',
    instagram: business?.instagram || '',
    categoria: business?.categoria || 'Tecnología',
    hora_a: business?.horario?.split('-')[0] || '', // Suponiendo que el horario es un rango
    hora_c: business?.horario?.split('-')[1] || '', // Suponiendo que el horario es un rango
    departamento: business?.departamento || '',
    ciudad: business?.ciudad || '',
    direccion: business?.direccion || '',
    lat: business?.lat ?? 0,
    lng: business?.lng ?? 0,
    activo: business?.activo ?? true,
    imageUrl: business?.imageUrl || '',  // Imagen del negocio (excluida del formulario)
    photos: business?.photos || [],  // Imágenes de productos (excluidas del formulario)
  });

  useEffect(() => {
    // Si el negocio cambia, actualizamos el formulario con los nuevos valores
    setForm({
      nombre: business?.nombre || '',
      descripcion: business?.descripcion || '',
      whatsapp: business?.whatsapp || '',
      facebook: business?.facebook || '',
      instagram: business?.instagram || '',
      categoria: business?.categoria || 'Tecnología',
      hora_a: business?.horario?.split('-')[0] || '',
      hora_c: business?.horario?.split('-')[1] || '',
      departamento: business?.departamento || '',
      ciudad: business?.ciudad || '',
      direccion: business?.direccion || '',
      lat: business?.lat ?? 0,
      lng: business?.lng ?? 0,
      activo: business?.activo ?? true,
      imageUrl: business?.imageUrl || '',
      photos: business?.photos || [],
    });
  }, [business]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-6">Editar Negocio</h2>

        <div className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <input
              type="text"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Whatsapp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Whatsapp</label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Facebook */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
            <input
              type="text"
              value={form.facebook}
              onChange={(e) => setForm({ ...form, facebook: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Instagram */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
            <input
              type="text"
              value={form.instagram}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="Tecnología">Tecnología</option>
              <option value="Servicios Profesionales">Servicios Profesionales</option>
              <option value="Retail">Retail</option>
            </select>
          </div>

          {/* Horario de apertura */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Apertura</label>
            <input
              type="text"
              value={form.hora_a}
              onChange={(e) => setForm({ ...form, hora_a: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="7:00 AM"
            />
          </div>

          {/* Horario de cierre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Cierre</label>
            <input
              type="text"
              value={form.hora_c}
              onChange={(e) => setForm({ ...form, hora_c: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="8:00 PM"
            />
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <input
              type="text"
              value={form.direccion}
              onChange={(e) => setForm({ ...form, direccion: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Departamento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
            <input
              type="text"
              value={form.departamento}
              onChange={(e) => setForm({ ...form, departamento: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Ciudad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
            <input
              type="text"
              value={form.ciudad}
              onChange={(e) => setForm({ ...form, ciudad: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Activo (editable) */}
          <div className="flex items-center gap-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.activo}
                onChange={(e) => setForm({ ...form, activo: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            </label>
            <span className="text-sm font-medium text-gray-700">Activo</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 text-sm text-white bg-black rounded hover:bg-gray-800 transition-colors"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};