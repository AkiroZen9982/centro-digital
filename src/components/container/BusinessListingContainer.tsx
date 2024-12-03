import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion"; // Importamos framer-motion para animaciones
import { ImageCarousel } from "../presentation/ImageCarousel"; // Carrusel de imágenes
import { CategoryCarousel } from "../presentation/CategoryCarousel"; // Carrusel de categorías
import { BusinessCard } from "../presentation/BusinessCardHome"; // Tarjetas de negocio
import { Footer } from "../presentation/Footer"; // Pie de página
import { useFavorites } from "../../hooks/useFavorites"; // Hook para gestionar favoritos
import { useBusinesses } from "../../hooks/useBusinesses"; // Hook para obtener datos de negocios
import { Heart } from "lucide-react"; // Icono de corazón (favoritos)
import { SearchBar } from "../presentation/SearchBar"; // Barra de búsqueda
import { Link } from "react-router-dom"; // Componente Link de React Router para navegación

// Caché de imágenes para optimizar el rendimiento
const imageCache = new Map();

// Función para cargar imágenes de manera diferida (lazy loading)
const fetchImage = (url: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    if (imageCache.has(url)) {
      resolve(imageCache.get(url)!); // Si la imagen ya está en la caché, la devuelve directamente
      return;
    }

    const image = new Image(); // Crea un objeto de imagen
    image.src = url;
    image.loading = "lazy"; // Asegura que la imagen se cargue de forma diferida (lazy load)

    // Cuando la imagen se ha cargado correctamente, se guarda en la caché
    image.onload = () => {
      imageCache.set(url, image);
      resolve(image);
    };

    // Maneja errores de carga de imagen
    image.onerror = () => {
      reject(new Error(`No se pudo cargar la imagen: ${url}`));
    };
  });
};

const CAROUSEL_IMAGES = [
  {
    id: 1,
    url: "https://epriqvuqygtntgabedhf.supabase.co/storage/v1/object/public/images/profile-1.webp",
    alt: "Promoción 1", // Texto alternativo de la imagen
  },
  {
    id: 2,
    url: "https://epriqvuqygtntgabedhf.supabase.co/storage/v1/object/public/images/profile-2.webp",
    alt: "Promoción 2",
  },
  {
    id: 3,
    url: "https://epriqvuqygtntgabedhf.supabase.co/storage/v1/object/public/images/profile-3.webp",
    alt: "Promoción 3",
  },
];

export const BusinessListingContainer = () => {
  // Estados locales para controlar la búsqueda, la categoría seleccionada, favoritos, etc.
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda ingresado por el usuario
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Índice de la imagen actual del carrusel
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Categoría seleccionada
  const [showFavorites, setShowFavorites] = useState(false); // Si se deben mostrar solo los negocios favoritos
  const [page, setPage] = useState(1); // Páginas para la paginación de negocios

  const { favorites, toggleFavorite } = useFavorites(); // Obtenemos los favoritos y función para alternarlos
  const { businesses, isLoading, error } = useBusinesses(); // Datos de los negocios

  // Filtrar los negocios según el término de búsqueda, la categoría seleccionada y si están activos
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const matchesSearch =
        business.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) || false; // Filtro por nombre
      const matchesCategory = selectedCategory
        ? business.categoria?.toLowerCase() === selectedCategory.toLowerCase()
        : true; // Filtro por categoría seleccionada
      const isActive = business.activo === true;  // Verifica que el negocio esté activo

      return matchesSearch && matchesCategory && isActive; // Devuelve los negocios que coinciden con los filtros
    });
  }, [businesses, searchTerm, selectedCategory]);

  // Si "showFavorites" es true, solo muestra los negocios favoritos
  const businessesToShow = useMemo(() => {
    return showFavorites
      ? filteredBusinesses.filter((business) => favorites.has(business.id)) // Filtra por favoritos
      : filteredBusinesses; // Muestra todos los negocios si no se filtran
  }, [filteredBusinesses, favorites, showFavorites]);

  // Paginación: muestra los negocios de acuerdo con la página actual
  const businessesToDisplay = useMemo(
    () => businessesToShow.slice(0, page * 8), // Limita la cantidad de negocios mostrados por página
    [businessesToShow, page]
  );

  // Pre-cargar imágenes de negocios y carrusel para optimizar la carga
  useEffect(() => {
    const imageUrls = [
      ...CAROUSEL_IMAGES.map((image) => image.url),
      ...businesses.map((business) => business.imageUrl).filter(Boolean), // Filtra los negocios con URL de imagen
    ];
    imageUrls.forEach((url) =>
      fetchImage(url).catch((error) => console.error(error.message)) // Manejo de errores en la carga de imágenes
    );
  }, [businesses]); // Se vuelve a ejecutar cuando cambian los negocios

  // Función para cambiar a la imagen anterior en el carrusel
  const handlePrevious = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1 // Si es la primera, vuelve a la última imagen
    );
  }, []);

  // Función para cambiar a la siguiente imagen en el carrusel
  const handleNext = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1 // Si es la última, vuelve a la primera imagen
    );
  }, []);

  // Alterna la visualización de solo favoritos
  const handleToggleFavorites = useCallback(() => {
    setShowFavorites((prev) => !prev);
  }, []);

  // Función para cargar más negocios cuando se hace clic en "Cargar más"
  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1); // Incrementa el número de página
  }, []);

  return (
    <>
      <motion.div
        className="max-w-7xl mx-auto px-4 py-8"
        initial={{ opacity: 0 }} // Efecto de opacidad al entrar
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ImageCarousel
          images={CAROUSEL_IMAGES}
          currentIndex={currentImageIndex}
          onPrevious={handlePrevious} // Función para la imagen anterior
          onNext={handleNext} // Función para la imagen siguiente
          onDotClick={setCurrentImageIndex} // Permite cambiar de imagen haciendo clic en los puntos
        />

        <div className="mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md border p-6 max-w-3xl mx-auto">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              {/* Barra de búsqueda */}
              <div className="relative flex-1">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
              </div>

              {/* Botones */}
              <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
                <button
                  onClick={handleToggleFavorites} // Alterna la vista de favoritos
                  className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      showFavorites
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                  <span
                    className={`ml-2 ${
                      showFavorites ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {showFavorites
                      ? "Ver todos los negocios"
                      : "Ver solo favoritos"} {/* Texto que cambia dependiendo de si se muestran los favoritos o todos los negocios */}
                  </span>
                </button>

                <Link to="/register-business"> {/* Enlace para registrar un nuevo negocio */}
                  <span className="inline-block px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Registra tu negocio
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <CategoryCarousel
            selectedCategory={selectedCategory} // Pasa la categoría seleccionada
            onSelectCategory={setSelectedCategory} // Pasa la función para seleccionar la categoría
            categories={[]} // Aquí se podrían pasar las categorías, actualmente está vacío
          />
        </div>

        {isLoading ? ( // Muestra mensaje de carga si los negocios están siendo cargados
          <div className="text-center mt-12">
            <p className="text-gray-500">Cargando negocios...</p>
          </div>
        ) : error ? ( // Muestra un error si ocurre
          <div className="text-center mt-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {businessesToDisplay.length === 0 ? ( // Si no hay negocios, muestra mensaje
              <div className="col-span-full text-center">
                <p>No hay negocios disponibles.</p>
              </div>
            ) : (
              businessesToDisplay.map((business) => {
                return (
                  <motion.div
                    key={business.id}
                    initial={{ opacity: 0, y: 20 }} // Animación de entrada
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <BusinessCard
                      business={business}
                      onFavorite={() => toggleFavorite(business.id)} // Alterna el favorito al hacer clic
                      isFavorite={favorites.has(business.id)} // Marca si es favorito
                    />
                  </motion.div>
                );
              })
            )}
          </div>
        )}

        {businessesToDisplay.length < businessesToShow.length && (
          <div className="text-center mt-6">
            <button
              onClick={handleLoadMore} // Cargar más negocios al hacer clic
              className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-blue-500 border-blue-500 hover:shadow-md transition-all"
            >
              Cargar más
            </button>
          </div>
        )}
      </motion.div>
      <Footer /> {/* Pie de página */}
    </>
  );
};
