// src/components/auth/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

// Interfaz que define la estructura del contexto de autenticación
interface AuthContextType {
  // Indica si el usuario está autenticado
  isAuthenticated: boolean;
  // Método para verificar el estado de autenticación
  checkAuthentication: () => void;
}

// Crea un contexto de autenticación con un valor inicial undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de contexto de autenticación que envuelve la aplicación
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado para rastrear si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para verificar la sesión actual del usuario
  const checkUser = async () => {
    // Obtiene la sesión actual de Supabase
    const { data } = await supabase.auth.getSession();
    // Actualiza el estado de autenticación basado en la existencia de una sesión
    setIsAuthenticated(!!data.session);
  };

  // Verifica la autenticación inicial cuando el componente se monta
  useEffect(() => {
    checkUser();
  }, []);

  // Configura un listener para cambios en el estado de autenticación
  useEffect(() => {
    // Escucha los cambios de autenticación (inicio/cierre de sesión)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      // Actualiza el estado de autenticación cuando cambia la sesión
      setIsAuthenticated(!!session);
    });

    // Limpia la suscripción cuando el componente se desmonta
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Proporciona el contexto de autenticación a los componentes hijos
  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuthentication: checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  // Obtiene el contexto de autenticación
  const context = useContext(AuthContext);
  
  // Lanza un error si se usa fuera de un AuthProvider
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  // Devuelve el contexto de autenticación
  return context;
};