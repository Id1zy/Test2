"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Icon settings for Leaflet markers
const DefaultIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapComponent() {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  // Array de ubicaciones en Santiago de Chile
  const locations = [
    { id: 1, name: "Hospital", position: [-33.4489, -70.6693], description: "Hospital en el centro de Santiago" },
    { id: 2, name: "Police Station", position: [-33.4511, -70.6820], description: "Comisaría de policía cercana" },
    { id: 3, name: "Fire Station", position: [-33.4448, -70.6555], description: "Estación de bomberos" },
  ];

  const centerPosition = [-33.4489, -70.6693];

  return (
    <MapContainer center={centerPosition} zoom={13} className="h-80 w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location) => (
        <Marker key={location.id} position={location.position}>
          <Popup>
            <strong>{location.name}</strong> <br /> {location.description}
          </Popup>
        </Marker>
      ))}

      {/* Marcador parpadeante en el centro */}
      <Marker position={centerPosition}>
        <div className="relative">
          <div className="w-8 h-8 bg-red-500 rounded-full animate-ping absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="w-4 h-4 bg-red-500 rounded-full absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </Marker>
    </MapContainer>
  );
}
