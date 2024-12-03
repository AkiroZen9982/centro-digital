import { Facebook, Instagram, Share2, MessageCircle, MapPin, ExternalLink } from 'lucide-react';

// Interfaz que define la estructura de la información del negocio
interface ShareButtonsProps {
  business: {
    nombre: string;     // Nombre del negocio
    direccion: string;  // Dirección del negocio
    ciudad: string;     // Ciudad del negocio    
    whatsapp?: string;  // Número de WhatsApp (opcional)
    facebook?: string;  // Enlace de Facebook (opcional)
    instagram?: string; // Enlace de Instagram (opcional)
  };
}

export const ShareButtons = ({ business }: ShareButtonsProps) => {
  // Obtiene la URL actual de la página
  const shareUrl = window.location.href;
  
  // Texto predeterminado para compartir
  const shareText = `Check out ${business.nombre}!`;
  
  // Genera una URL para abrir la ubicación en Google Maps
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${business.ciudad} ${business.direccion}`
  )}`;

  // Función para manejar la acción de compartir
  const handleShare = async () => {
    // Comprueba si el navegador soporta la API de compartir nativo
    if (navigator.share) {
      try {
        // Intenta usar el método de compartir nativo del dispositivo
        await navigator.share({
          title: business.nombre,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        // Maneja cualquier error durante el proceso de compartir
        console.error('Error sharing:', error);
      }
    } else {
      // Alternativa para navegadores que no soportan compartir
      console.log('Sharing not supported on this browser');
      
      // Copia el enlace al portapapeles
      copyToClipboard(shareUrl);
      
      // Muestra una alerta al usuario
      alert('El enlace ha sido copiado al portapapeles.');
    }
  };
  
  // Función para copiar texto al portapapeles
  const copyToClipboard = (text:any) => {
    navigator.clipboard.writeText(text).catch((err) => {
      // Maneja errores al copiar al portapapeles
      console.error('Error copying to clipboard', err);
    });
  };
  

  return (
    <div className="space-y-6">
      {/* Sección de enlaces de redes sociales */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Social Media</h3>
        <div className="inline-flex flex-col gap-4">
          {/* Botón de WhatsApp (se muestra solo si está disponible) */}
          {business.whatsapp && (
            <a
              href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent("Hola, vengo de parte de Centro digital")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
          )}

          {/* Botón de Facebook (se muestra solo si está disponible) */}
          {business.facebook && (
            <a
              href={business.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span className="text-sm font-medium">Facebook</span>
            </a>
          )}

          {/* Botón de Instagram (se muestra solo si está disponible) */}
          {business.instagram && (
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="text-sm font-medium">Instagram</span>
            </a>
          )}
        </div>
      </div>

      {/* Sección de acciones rápidas */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
        <div className="flex gap-4">
          {/* Botón para abrir la ubicación en Google Maps */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Open in Maps</span>
            <ExternalLink className="h-4 w-4 ml-1" />
          </a>

          {/* Botón para compartir */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Share2 className="h-5 w-5" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};