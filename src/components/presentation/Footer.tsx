import { Link } from 'react-router-dom';
import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Twitter } from 'lucide-react';

// Componente Footer
export const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Contenedor para las columnas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sección de Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              {/* Enlace a la página principal */}
              <li>
                <Link to="/" className='text-gray-600 hover:text-blue-500'>
                  Home
                </Link>
              </li>
              {/* Enlace para registrar un negocio */}
              <li>
                <Link to="/register-business" className="text-gray-600 hover:text-blue-500">
                  Registra un negocio
                </Link>
              </li>
              {/* Enlace al centro de ayuda */}
              <li>
                <Link to="/help" className="text-gray-600 hover:text-blue-500">
                  Centro de ayuda
                </Link>
              </li>
            </ul>
          </div>

          {/* Sección de Enlaces Legales */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {/* Enlace a los términos y condiciones */}
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-blue-500">
                  Términos y condiciones
                </Link>
              </li>
              {/* Enlace a las políticas de privacidad */}
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-blue-500">
                  Políticas de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Sección de Soporte */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Soporte</h3>
            <ul className="space-y-2">
              {/* Enlace para contactar por correo */}
              <li>
                <a href="mailto:garaven.camilo@gmail.com" className="text-gray-600 hover:text-blue-500">
                  Contáctanos
                </a>
              </li>
            </ul>
          </div>

          {/* Sección de Redes Sociales */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Siguenos</h3>
            <div className="flex space-x-4">
              {/* Enlace al perfil de Facebook */}
              <a href="https://facebook.com/centro-digital" className="text-gray-600 hover:text-blue-600">
                <Facebook />
              </a>
              {/* Enlace al perfil de Twitter */}
              <a href="https://twitter.com/centro-digital" className="text-gray-600 hover:text-blue-400">
                <Twitter />
              </a>
              {/* Enlace al perfil de Instagram */}
              <a href="https://instagram.com/centro-digital" className="text-gray-600 hover:text-pink-500">
                <Instagram />
              </a>
            </div>
          </div>
        </div>

        {/* Pie de página con el año y derechos de autor */}
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Centro Digital. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
