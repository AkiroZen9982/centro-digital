import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/authContext";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  // Extrae el estado de autenticación desde el contexto de autenticación personalizado
  const { isAuthenticated } = useAuth();
  
  // Hooks de estado para manejar entradas del formulario y manejo de errores
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  // Hook de navegación para cambios de ruta programáticos
  const navigate = useNavigate();

  // Redirecciona al panel de control si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Maneja el envío del formulario de inicio de sesión
  const handleSubmit = async (event: React.FormEvent) => {
    // Previene el comportamiento predeterminado de envío del formulario
    event.preventDefault();
    // Reinicia cualquier estado de error previo
    setError(null);

    // Intenta iniciar sesión con autenticación de Supabase
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Maneja el fallo del inicio de sesión
    if (loginError) {
      setError("Credenciales incorrectas.");
      return;
    }

    // Extrae tokens de autenticación del inicio de sesión exitoso
    const { access_token, refresh_token } = data.session;

    // Almacena los tokens en el almacenamiento local para autenticación persistente
    localStorage.setItem("sb-access-token", access_token);
    localStorage.setItem("sb-refresh-token", refresh_token);

    // Navega al panel de control después de un inicio de sesión exitoso
    navigate("/dashboard");
  };

  return (
    // Contenedor exterior con diseño centrado en pantalla completa y animación de desvanecimiento
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Formulario de inicio de sesión con animaciones de deslizamiento y desvanecimiento */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Título de página con animación de desvanecimiento retardada */}
        <motion.h2
          className="text-2xl font-semibold mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Iniciar sesión
        </motion.h2>

        {/* Campo de entrada de correo electrónico con animación */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Correo electrónico:
          </label>
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          />
        </div>

        {/* Campo de entrada de contraseña con animación */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Contraseña:
          </label>
          <motion.input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        </div>

        {/* Visualización de mensaje de error con animación */}
        {error && (
          <motion.p
            className="text-red-500 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}

        {/* Botón de envío con animaciones de hover y tap */}
        <motion.button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Iniciar sesión
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Login;