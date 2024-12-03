import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Footer } from './Footer';

export const PrivacyContainer = () => {
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
            <h1 className="text-3xl font-bold">Política de privacidad</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Información que recopilamos</h2>
              <p className="text-gray-600">
                Recopilamos la información que nos proporcionas directamente, incluyendo cuando registras un negocio, creas una cuenta o nos contactas para soporte.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Cómo usamos tu información</h2>
              <p className="text-gray-600">
                Usamos la información que recopilamos para proporcionar, mantener y mejorar nuestros servicios, para comunicarnos contigo y para desarrollar nuevos servicios.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Compartición de información</h2>
              <p className="text-gray-600">
                No compartimos tu información personal con terceros, excepto según se describe en esta política de privacidad o con tu consentimiento.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
