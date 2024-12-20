import { useState, useMemo, useCallback } from 'react';
import { LogOut, LayoutGrid, List } from 'lucide-react';
import { Business, BusinessFilters } from '../../types/';
import { BusinessCard } from '../presentation/BusinessCardDashboard';
import { BusinessFilterBar } from '../presentation/BusinessFilters';
import { DeleteConfirmationModal } from '../presentation/DeleteConfirmation';
import { BusinessModal } from '../presentation/BusinessModal';
import { useBusinesses } from '../../hooks/useBusinesses';
import { supabase } from '../../lib/supabase';
import slugify from 'slugify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/authContext'; // Importamos el contexto de autenticación

export const DashboardContainer = () => {
  const { businesses, isLoading, error } = useBusinesses(); // Obtenemos los negocios, el estado de carga y los errores
  const { checkAuthentication } = useAuth(); // Usamos checkAuthentication del contexto de autenticación
  const [filters, setFilters] = useState<BusinessFilters>({
    search: '', // Filtro de búsqueda por nombre
    category: 'Todas las categorías', // Filtro por categoría
    status: 'all', // Filtro por estado
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list'); // Modo de vista (cuadrícula o lista)
  const [businessToDelete, setBusinessToDelete] = useState<Business | undefined>(); // Negocio seleccionado para eliminar
  const [businessToEdit, setBusinessToEdit] = useState<Business | null>(null); // Negocio seleccionado para editar
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal de eliminación
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado del modal de edición
  const navigate = useNavigate(); // Hook de navegación para redirigir

  // Función para cerrar sesión
  const handleLogout = async () => {
    await supabase.auth.signOut(); // Cerrar sesión en Supabase
    checkAuthentication(); // Actualizamos el estado de autenticación
    localStorage.removeItem('sb-access-token'); // Limpiamos los tokens de localStorage
    localStorage.removeItem('sb-refresh-token');
    navigate('/login'); // Redirigimos a la página de login
  };

  // Filtros de negocios (actualizados)
  const filteredBusinesses = useMemo(() => {
    if (!businesses || businesses.length === 0) return []; // Si no hay negocios, no filtramos nada

    const searchQuery = filters.search.trim().toLowerCase(); // Filtramos por nombre
    const categoryFilter = filters.category.toLowerCase(); // Filtramos por categoría
    const statusFilter = filters.status; // Filtramos por estado

    return businesses.filter((business) => {
      const businessName = business.nombre?.toLowerCase() || '';
      const businessCategory = business.categoria?.toLowerCase() || '';
      const isActive = business.activo;

      const matchesSearch = searchQuery === '' || businessName.includes(searchQuery); // Coincidencia con la búsqueda
      const matchesCategory = categoryFilter === 'todas las categorías' || businessCategory === categoryFilter; // Coincidencia con la categoría
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && isActive) ||
        (statusFilter === 'inactive' && !isActive); // Coincidencia con el estado

      return matchesSearch && matchesCategory && matchesStatus; // Devolvemos los negocios que coinciden con los filtros
    });
  }, [businesses, filters]);

  // Función para actualizar los filtros
  const updateFilter = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value, // Actualizamos el filtro correspondiente
    }));
  };

  const handleDeleteBusiness = useCallback(async () => {
    if (businessToDelete) {
      try {
        const { error } = await supabase
          .from('negocios')
          .delete()
          .eq('id', businessToDelete.id); // Eliminamos el negocio de la base de datos

        if (error) throw error;

        window.location.reload(); // Recargamos la página para reflejar el cambio
      } catch (error) {
        console.error('Error deleting business:', error); // Manejamos el error en caso de que falle la eliminación
      }
      setBusinessToDelete(undefined); // Restablecemos el negocio a eliminar
      setIsModalOpen(false); // Cerramos el modal de eliminación
    }
  }, [businessToDelete]);

  const handleEditBusiness = useCallback(async (updatedBusiness: Partial<Business>) => {
    if (!businessToEdit) return;

    try {
      const slug = updatedBusiness.nombre
        ? slugify(updatedBusiness.nombre.toLowerCase()) // Generamos un slug para el negocio
        : businessToEdit.slug;

      let lat = businessToEdit.lat;
      let lng = businessToEdit.lng;

      if (
        updatedBusiness.direccion !== businessToEdit.direccion ||
        updatedBusiness.ciudad !== businessToEdit.ciudad ||
        updatedBusiness.departamento !== businessToEdit.departamento
      ) {
        try {
          const direccionCompleta = `${updatedBusiness.direccion}, ${updatedBusiness.ciudad}, ${updatedBusiness.departamento}`;
          const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccionCompleta)}`;

          const response = await fetch(url);
          const data = await response.json();

          if (data.length > 0) {
            lat = parseFloat(data[0].lat);
            lng = parseFloat(data[0].lon);
          }
        } catch (error) {
          console.error('Error getting coordinates:', error); // Manejamos el error si falla la obtención de coordenadas
        }
      }

      const { error } = await supabase
        .from('negocios')
        .update({
          nombre: updatedBusiness.nombre,
          descripcion: updatedBusiness.descripcion,
          whatsapp: updatedBusiness.whatsapp || null,
          facebook: updatedBusiness.facebook || null,
          instagram: updatedBusiness.instagram || null,
          categoria: updatedBusiness.categoria,
          hora_a: updatedBusiness.hora_a,
          hora_c: updatedBusiness.hora_c,
          slug,
          departamento: updatedBusiness.departamento,
          ciudad: updatedBusiness.ciudad,
          direccion: updatedBusiness.direccion,
          lat,
          lng,
          activo: updatedBusiness.activo
        })
        .eq('id', businessToEdit.id); // Actualizamos los datos del negocio

      if (error) throw error;

      window.location.reload(); // Recargamos la página para reflejar los cambios
    } catch (error: any) {
      console.error('Error updating business:', error.message); // Manejamos el error en caso de que falle la actualización
    }

    setBusinessToEdit(null); // Restablecemos el negocio a editar
    setIsEditModalOpen(false); // Cerramos el modal de edición
  }, [businessToEdit]);

  const handleOpenModal = useCallback((business: Business) => {
    setBusinessToDelete(business); // Establecemos el negocio a eliminar
    setIsModalOpen(true); // Abrimos el modal de confirmación de eliminación
  }, []);

  const handleCloseModal = useCallback(() => {
    setBusinessToDelete(undefined); // Restablecemos el negocio a eliminar
    setIsModalOpen(false); // Cerramos el modal de eliminación
  }, []);

  const handleOpenEditModal = useCallback((business: Business) => {
    setBusinessToEdit(business); // Establecemos el negocio a editar
    setIsEditModalOpen(true); // Abrimos el modal de edición
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setBusinessToEdit(null); // Restablecemos el negocio a editar
    setIsEditModalOpen(false); // Cerramos el modal de edición
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className='flex gap-1 items-center'>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          {/* Botón de cerrar sesión */}
          <button
            onClick={handleLogout} // Llamamos a la función de cierre de sesión
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </header>

      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'list' ? 'bg-gray-100 text-gray-800' : 'hover:bg-gray-50 text-gray-600'}`}
              title="Vista de lista"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'grid' ? 'bg-gray-100 text-gray-800' : 'hover:bg-gray-50 text-gray-600'}`}
              title="Vista en cuadrícula"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        <BusinessFilterBar filters={filters} onFilterChange={updateFilter} />

        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : ''}>
          {filteredBusinesses.map((business) => (
            <div key={business.id}>
              <BusinessCard
                business={business}
                onDelete={handleOpenModal}
                onEdit={handleOpenEditModal} viewMode={'list'}              />
            </div>
          ))}
        </div>
      </main>

      <DeleteConfirmationModal
        business={businessToDelete!}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteBusiness}
      />

      {businessToEdit && (
        <BusinessModal
          business={businessToEdit}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleEditBusiness}
        />
      )}
    </div>
  );
};
