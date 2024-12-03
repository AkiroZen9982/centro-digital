import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import { supabase } from '../../lib/supabase';
import { BusinessForm } from '../../types';
import { RegisterBusinessForm } from '../presentation/RegisterBusinessForm';

export const RegisterBusinessContainer = () => {
  const navigate = useNavigate(); // Hook para navegación después del envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para rastrear si el formulario está siendo enviado
  const [error, setError] = useState<string | null>(null); // Estado para rastrear cualquier mensaje de error
  const [formData, setFormData] = useState<BusinessForm>({
    // Datos iniciales del formulario con campos para el registro de negocio
    nombre: '',
    descripcion: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    categoria: '',
    hora_a: '',
    hora_c: '',
    slug: '',
    departamento: '',
    ciudad: '',
    direccion: '',
    lat: 0,
    lng: 0,
    activo: true,
    image: null, // Imagen principal del negocio
    productImages: [], // Imágenes de productos (hasta tres)
  });

  // Función para obtener latitud y longitud de la dirección ingresada por el usuario
  const obtenerCoordenadas = async () => {
    const { direccion, ciudad } = formData;

    if (!direccion || !ciudad) return; // Salir si no hay dirección o ciudad

    const direccionCompleta = `${ciudad}, ${direccion}`; // Dirección completa
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccionCompleta)}`;

    try {
      const response = await fetch(url); // Obteniendo coordenadas desde OpenStreetMap
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0]; // 'lon' es la longitud en la API de Nominatim
        return { lat: parseFloat(lat), lng: parseFloat(lon) }; // Retornar lat y lng
      } else {
        setError('No se pudo encontrar la dirección.'); // Si no se encuentran coordenadas, mostrar error
        return null;
      }
    } catch (error) {
      console.error('Error al obtener las coordenadas:', error);
      setError('Error al obtener las coordenadas.'); // Manejar error en la obtención de coordenadas
      return null;
    }
  };

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value }; // Actualizar los datos del formulario
      if (name === 'nombre') {
        newData.slug = slugify(value.toLowerCase()); // Generar slug a partir del nombre
      }
      return newData;
    });
  };

  // Función para manejar los cambios de archivos de imagen (imagen principal o imágenes de productos)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      // Validar si el archivo es una imagen
      const validTypes = ['image/webp', 'image/webp'];
      if (validTypes.includes(file.type)) {
        if (index !== undefined) {
          // Si es una imagen de producto, almacenarla en el índice especificado
          setFormData((prev) => {
            const newProductImages = [...prev.productImages];
            newProductImages[index] = file;
            return { ...prev, productImages: newProductImages };
          });
        } else {
          // Si es la imagen principal, almacenarla en el estado del formulario
          setFormData((prev) => ({ ...prev, image: file }));
        }
      } else {
        setError('Por favor, sube una imagen válida (Webp).'); // Mostrar error si el archivo no es una imagen válida
      }
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validar campos requeridos antes de enviar
    if (!formData.nombre.trim()) {
      setError('El nombre del negocio es obligatorio.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.descripcion.trim()) {
      setError('La descripción es obligatoria.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.categoria) {
      setError('La categoría es obligatoria.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.departamento) {
      setError('El departamento es obligatorio.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.ciudad) {
      setError('La ciudad es obligatoria.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.hora_a || !formData.hora_c) {
      setError('Se requieren las horas de apertura y cierre.');
      setIsSubmitting(false);
      return;
    }

    if (formData.hora_a >= formData.hora_c) {
      setError('La hora de apertura debe ser antes de la hora de cierre.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.image) {
      setError('La imagen principal del negocio es obligatoria.');
      setIsSubmitting(false);
      return;
    }

    try {
      if (!supabase) {
        throw new Error('Conexión a la base de datos no disponible');
      }

      // Obtener las coordenadas de la dirección ingresada
      const coordenadas = await obtenerCoordenadas();
      if (!coordenadas) return; // Si no se pueden obtener las coordenadas, detener el proceso

      const { lat, lng } = coordenadas; // Obtener latitud y longitud

      let imageUrl = ''; // URL para la imagen principal
      if (formData.image) {
        const fileName = `business-${formData.slug}.webp`;
        const { data, error: uploadError } = await supabase
          .storage
          .from('images')
          .upload(fileName, formData.image, { contentType: 'image/webp' });

        if (uploadError) {
          throw new Error(uploadError.message || 'Error al subir la imagen');
        }

        const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
        imageUrl = publicUrlData?.publicUrl || ''; // Obtener URL de la imagen principal
      }

      // Subir imágenes de productos (hasta 3 imágenes)
      const productImageUrls: string[] = []; // Para almacenar las URLs de las imágenes de productos
      for (let i = 0; i < formData.productImages.length; i++) {
        const productImage = formData.productImages[i];
        if (productImage) {
          const productFileName = `business-${formData.slug}-${i + 1}.webp`;
          const { data: productData, error: productUploadError } = await supabase
            .storage
            .from('images')
            .upload(productFileName, productImage, { contentType: 'image/webp' });

          if (productUploadError) {
            throw new Error(productUploadError.message || `Error al subir la imagen de producto ${i + 1}`);
          }

          const { data: productPublicUrlData } = supabase.storage.from('images').getPublicUrl(productFileName);
          productImageUrls.push(productPublicUrlData?.publicUrl || ''); // Agregar URL de la imagen de producto
        }
      }

      // Preparar los datos para insertar en la base de datos
      const { image, productImages, ...submissionData } = formData;

      const dataToInsert = {
        ...submissionData,
        activo: true,
        lat,
        lng,
        // No guardamos imageUrl ni productImageUrls en la base de datos aquí
      };

      console.log('Datos a insertar:', dataToInsert);

      // Insertar los datos del negocio (sin las URLs de las imágenes)
      const { error: supabaseError } = await supabase.from('negocios').insert([dataToInsert]);

      if (supabaseError) {
        throw new Error(supabaseError.message || 'Error al insertar datos en la tabla de negocios');
      }

      // Opcionalmente, puedes asociar las URLs de las imágenes con productos aquí.
      // Por ahora, las URLs se suben pero no se guardan en la base de datos.

      navigate('/'); // Redirigir a la página principal o a otra sección después de enviar el formulario
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error'); // Mostrar error si algo sale mal
    } finally {
      setIsSubmitting(false); // Restablecer el estado de envío
    }
  };

  return (
    <RegisterBusinessForm
      formData={formData}
      error={error}
      isSubmitting={isSubmitting}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onBack={() => navigate('/')}
      onFileChange={handleFileChange}
    />
  );
};
