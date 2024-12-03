import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Footer } from './Footer';

export const HelpCenterContainer = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-3xl font-bold">Centro de Ayuda</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Preguntas Frecuentes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">¿Cómo registro mi negocio?</h3>
                  <p className="text-gray-600">Haz clic en el enlace "Registrar Negocio" en el pie de página y llena el formulario de registro con los detalles de tu negocio.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">¿Cómo puedo editar la información de mi negocio?</h3>
                  <p className="text-gray-600">Contacta a nuestro equipo de soporte con tu ID de negocio y la información que deseas actualizar.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">¿Qué son los favoritos?</h3>
                  <p className="text-gray-600">Los favoritos te permiten guardar los negocios que te interesan para acceder a ellos rápidamente más tarde.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Contactar Soporte</h2>
              <p className="text-gray-600 mb-4">
                ¿Necesitas más ayuda? Nuestro equipo de soporte está disponible de lunes a viernes, de 9am a 5pm.
              </p>
              <a
                href="mailto:garaven.camilo@gmail.com"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Contactar Soporte
              </a>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
