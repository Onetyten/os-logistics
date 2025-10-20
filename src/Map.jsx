import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useShipmentAnalysis } from "./hooks/shipmentAnalysis";
import "leaflet/dist/leaflet.css";
import { Suspense } from "react";
import SpotlightBorder from "./Components/SpotlightBorder";


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
    <SpotlightBorder className="w-full z-10 h-[88vh] border-4 border-border-muted flex justify-center overflow-hidden items-center">
      <Suspense fallback={<div className="bg-textclr2 h-full w-full"></div>}>
          <MapContainer center={center} zoom={5} minZoom={4} maxZoom={15}  style={{ height: "100%", width: "100%" }}>
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
                  <Polyline
                    positions={[origin, destination]}
                    pathOptions={{ color: "#3ECF8E", weight: 1, opacity: 0.4 }}
                  />

                  <Marker position={origin} icon={originIcon}>
                    <Popup>
                      <b>Origin:</b> {shipment.origin.city}, {shipment.origin.country}
                    </Popup>
                  </Marker>
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

    </SpotlightBorder>
  );
}
