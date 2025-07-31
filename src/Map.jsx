import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useShipmentAnalysis } from "./hooks/shipmentAnalysis";
import "leaflet/dist/leaflet.css";
import { Suspense } from "react";

// Custom icons
const originIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const destinationIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function MapView() {
  const { shipmentData } = useShipmentAnalysis();
  const center = [20, 0];

  return (
    <div className="w-full h-[88vh] flex justify-center overflow-hidden items-center">
      <Suspense fallback={<div className="bg-textclr2 h-full w-full"></div>}>
          <MapContainer center={center} zoom={5} minZoom={4}  style={{ height: "100%", width: "100%" }}>
            {/* simplest */}
            {/* <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            /> */}

              {/* <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap contributors & CartoDB'
            /> */}

            {/* <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenMapTiles & Stadia Maps'
            /> */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri"
              maxZoom={19}
            />


            {shipmentData.map((shipment, index) => {
              const origin = [shipment.origin.latitude, shipment.origin.longitude];
              const destination = [shipment.destination.latitude, shipment.destination.longitude];

              return (
                <div key={index}>
                  {/* Polyline between origin and destination */}
                  <Polyline
                    positions={[origin, destination]}
                    pathOptions={{ color: "#1b54fe", weight: 1, opacity: 0.4 }}
                  />

                  {/* Origin Marker */}
                  <Marker position={origin} icon={originIcon}>
                    <Popup>
                      <b>Origin:</b> {shipment.origin.city}, {shipment.origin.country}
                    </Popup>
                  </Marker>

                  {/* Destination Marker */}
                  <Marker position={destination} icon={destinationIcon}>
                    <Popup>
                      <b>Destination:</b> {shipment.destination.city}, {shipment.destination.country}
                    </Popup>
                  </Marker>
                </div>
              );
            })}
          </MapContainer>
      </Suspense>

    </div>
  );
}
