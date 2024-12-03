import { useEffect, useState } from 'react';
import { categories } from '../../utils/categories'; 
import { ArrowLeft } from 'lucide-react';
import { BusinessForm } from '../../types';
import useDepartments from '../../hooks/useDepartments';

interface RegisterBusinessFormProps {
  formData: BusinessForm;
  error: string | null;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, index?: number) => void;
}

export const RegisterBusinessForm: React.FC<RegisterBusinessFormProps> = ({
  formData,
  error,
  isSubmitting,
  onChange,
  onSubmit,
  onBack,
  onFileChange,  // Recibimos la función para manejar el cambio de archivo
}) => {
  const departamentos = useDepartments();  // Usamos el hook que trae los departamentos
  const [ciudadesFiltradas, setCiudadesFiltradas] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);

  // Al seleccionar un departamento, filtramos las ciudades
  useEffect(() => {
    if (formData.departamento) {
      setCiudadesFiltradas(departamentos[formData.departamento] || []);
    }
  }, [formData.departamento, departamentos]);

  // Función para manejar el cambio de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo (solo webp)
    if (!file.type.includes('image/webp')) {
      setImageError('Solo se aceptan imagenes .webp');
      return;
    }

    // Validar tamaño (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setImageError('El tamaño de la imagen no puede exceder 2MB.');
      return;
    }

    setImageError(null); // Limpiar cualquier error previo
    onFileChange(e, index); // Llamamos a la función onFileChange original
  };

  // Comprobamos si hay error de imagen o si se está enviando
  const isSubmitDisabled = imageError !== null || isSubmitting;

  return (
    <div className="max-w-4xl mt-6 mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      {/* Botón de regreso */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Registra tu negocio</h1>

      {/* Mostrar error si lo hay */}
      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      {/* Formulario */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Nombre del negocio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del negocio</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingresa el nombre de tu negocio"
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe tu negocio"
            required
          ></textarea>
        </div>

        {/* WhatsApp */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingresa el numero de WhatsApp"
          />
        </div>

        {/* URLs de redes sociales */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa la url del Facebook"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa la url del Instagram"
            />
          </div>
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="" disabled>Selecciona una categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>{category.name}</option>
            ))}
          </select>
        </div>

        {/* Campos de horario */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora de apertura</label>
            <input
              type="time"
              name="hora_a"
              value={formData.hora_a}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora de cierre</label>
            <input
              type="time"
              name="hora_c"
              value={formData.hora_c}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Ubicación */}
        <div className="grid grid-cols-2 gap-4">
            {/* Departamento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
              <select
                name="departamento"
                value={formData.departamento}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Selecciona el departamento</option>
                {Object.keys(departamentos).map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>

            {/* Ciudad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
              <select
                name="ciudad"
                value={formData.ciudad}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Selecciona la ciudad</option>
                {ciudadesFiltradas.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

        {/* Dirección */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingresa la dirección"
            required
          />
        </div>

        {/* Subida de imagen de perfil */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagen de perfil: webp</label>
          <input
            type="file"
            name="image"
            accept="image/jpeg"
            onChange={handleImageChange} // Usamos la nueva función de manejo de imagen
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
          {imageError && (
            <p className="text-red-500 text-sm mt-2">{imageError}</p>
          )}
          {formData.image && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Vista previa de la imagen"
                className="w-40 h-40 object-cover rounded"
              />
            </div>
          )}
        </div>

        {/* Subida de imágenes de productos */}
        {[...Array(3)].map((_, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen producto {index + 1}: webp
            </label>
            <input
              type="file"
              accept="image/jpeg"
              onChange={(e) => handleImageChange(e, index)} // Usamos la misma función para imágenes de productos
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            {formData.productImages[index] && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(formData.productImages[index])}
                  alt={`Vista previa del producto ${index + 1}`}
                  className="w-40 h-40 object-cover rounded"
                />
              </div>
            )}
          </div>
        ))}

        {/* Botón de envío */}
        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${isSubmitDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={isSubmitDisabled}
        >
          {isSubmitting ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
}
