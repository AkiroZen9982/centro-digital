import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

// Solución para el ícono predeterminado del marcador en Leaflet
const defaultIcon = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', // URL del icono del marcador
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png', // URL para íconos de retina
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png', // URL para la sombra del marcador
  iconSize: [25, 41], // Tamaño del ícono
  iconAnchor: [12, 41], // Ancla del ícono, donde se coloca sobre el marcador
});

interface BusinessMapProps {
  ubicacion: {
    lat: number; // Latitud de la ubicación
    lng: number; // Longitud de la ubicación
  };
  nombre: string; // Nombre del negocio
  direccion: string; // Dirección del negocio
}

export const BusinessMap = ({ ubicacion, nombre, direccion }: BusinessMapProps) => {
  return (
    // Contenedor del mapa, configurado para centrarse en la ubicación dada y un nivel de zoom de 15
    <MapContainer
      center={ubicacion} // Posición central del mapa
      zoom={15} // Nivel de zoom
      className="h-[400px] w-full rounded-lg z-0" // Estilo del mapa (alto, ancho y bordes redondeados)
    >
      {/* Capa del mapa de OpenStreetMap */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // URL de las baldosas de OpenStreetMap
      />
      {/* Marcador en la ubicación proporcionada */}
      <Marker position={ubicacion} icon={defaultIcon}>
        {/* Ventana emergente que aparece al hacer clic en el marcador */}
        <Popup>
          <div className="text-sm">
            <strong className="block mb-1">{nombre}</strong> {/* Nombre del negocio */}
            <span>{direccion}</span> {/* Dirección del negocio */}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};
