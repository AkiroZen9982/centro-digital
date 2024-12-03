import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Footer } from './Footer';

export const TermsContainer = () => {
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
            <h1 className="text-3xl font-bold">Términos y Condiciones</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Aceptación de los términos</h2>
              <p className="text-gray-600">
                Al acceder y utilizar este sitio web, aceptas y te comprometes a cumplir con los términos y disposiciones de este acuerdo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Licencia de uso</h2>
              <p className="text-gray-600">
                Se otorga permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de <em>Centro Digital</em> solo para visualización transitoria y personal, no comercial.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Exención de responsabilidad</h2>
              <p className="text-gray-600">
                Los materiales en el sitio web de <em>Centro Digital</em> se proporcionan "tal cual". <em>Centro Digital</em> no ofrece garantías, expresas o implícitas, y por la presente rechaza y anula todas las demás garantías, incluyendo, sin limitación, las garantías implícitas o condiciones de comerciabilidad, adecuación para un propósito particular, o no infracción de propiedad intelectual u otra violación de derechos.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
