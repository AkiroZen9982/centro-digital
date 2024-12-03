import { useState, useEffect } from 'react';

export const useFavorites = () => {
  // Estado de favoritos utilizando un Set para almacenar IDs de negocios
  // Inicializa el estado recuperando favoritos guardados en localStorage
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    // Intenta recuperar favoritos guardados previamente
    const saved = localStorage.getItem('businessFavorites');
    // Si existen favoritos guardados, los convierte de nuevo a un Set
    // De lo contrario, crea un Set vacío
    return saved ? new Set(JSON.parse(saved)) : new Set<string>();
  });

  // Efecto que guarda los favoritos en localStorage cada vez que cambian
  useEffect(() => {
    // Convierte el Set de favoritos a un array para poder guardarlo en localStorage
    localStorage.setItem('businessFavorites', JSON.stringify([...favorites]));
  }, [favorites]);

  // Función para alternar el estado de favorito de un negocio
  const toggleFavorite = (businessId: string) => {
    setFavorites(prev => {
      // Crea una copia del Set de favoritos actual
      const newFavorites = new Set(prev);

      // Si el negocio ya está en favoritos, lo elimina
      // Si no está en favoritos, lo agrega
      if (newFavorites.has(businessId)) {
        newFavorites.delete(businessId);
      } else {
        newFavorites.add(businessId);
      }

      // Devuelve el nuevo conjunto de favoritos
      return newFavorites;
    });
  };

  // Devuelve el conjunto de favoritos y la función para alternar favoritos
  return { favorites, toggleFavorite };
};