/* eslint-disable react-hooks/exhaustive-deps */
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useShipmentAnalysis } from "./hooks/shipmentAnalysis";
import "leaflet/dist/leaflet.css";
import { Suspense, useEffect, useMemo, useState } from "react";
import SpotlightBorder from "./Components/SpotlightBorder";
import PropTypes from "prop-types";


const Pin = (color = "#60a5fa") => L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
           <path fill="${color}" d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7z"/>
         </svg>`,
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});
const originIcon = Pin("#3ECF8E");      
const destinationIcon = Pin("#f87171");

const DEFAULT_CENTER = { lat: 20, lng: 0 };
const DEFAULT_ZOOM = 6;

export default function MapView() {

    const { shipmentData } = useShipmentAnalysis();
    const [index,setIndex] = useState(0)
    const shipment = shipmentData[index]
 
    const isValidCoordinate = (lat, lng) => {
      return ( typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng) &&lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180)
    }
    const origin = useMemo(() => {
      const lat = shipment?.origin?.latitude;
      const lng = shipment?.origin?.longitude;
      if (isValidCoordinate(lat, lng)) {
        return { lat, lng };
      }
        return null;
      }, [index]);
  
    const destination = useMemo(() => {
      const lat = shipment?.destination?.latitude;
      const lng = shipment?.destination?.longitude;
      if (isValidCoordinate(lat, lng)) {
        return { lat, lng };
      }
      return null;
    }, [index]);
  
    const [routeCoords, setRouteCoords] = useState([]);
  
    useEffect(() => {
      if (!origin || !destination) {
        setRouteCoords([]);
        return;
      }
      setRouteCoords([origin, destination]);
    }, [origin, destination]);
  
    const mapCenter = useMemo(() => {
      if (origin && destination) {
        return {
          lat: (origin.lat + destination.lat) / 2,
          lng: (origin.lng + destination.lng) / 2
        };
      } else if (origin) {
        return origin;
      } else if (destination) {
        return destination;
      }
      return DEFAULT_CENTER;
    }, [origin, destination]);
  
    const mapZoom = useMemo(() => {
      if (origin && destination) {
        return 6;
      } else if (origin || destination) {
        return 8;
      }
      return DEFAULT_ZOOM;
    }, [origin, destination]);
  
    function FitBounds({ positions }) {
      const map = useMap();
      
      useEffect(() => {
        if (positions && positions.length > 0) {
          try {
            map.fitBounds(positions);
          } catch (error) {
            console.warn('Error fitting bounds:', error);
          }
        }
      }, [positions, map]);
      return null;
    }
  
    FitBounds.propTypes = {
      positions: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.number),
          PropTypes.object
        ])
      ).isRequired
    };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex >= shipmentData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [shipmentData.length]);

  return (
    <SpotlightBorder className="w-full z-10 h-[88vh] border-4 border-border-muted flex justify-center overflow-hidden items-center">
      <Suspense fallback={<div className="bg-textclr2 h-full w-full"></div>}>
          <MapContainer maxBoundsViscosity={1.0} maxBounds={[[ -90, -180 ],[ 90, 180 ]]} center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} maxZoom={15} minZoom={2} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}" attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ" maxZoom={16 } />            
            <div key={index}>
              {routeCoords.length > 0 && (
                <>
                  <Polyline  positions={routeCoords}  pathOptions={{ color: "#3ECF8E", weight: 3, opacity: 0.8 }} />
                  <FitBounds positions={routeCoords} />
                </>
              )}

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
        
          </MapContainer>
      </Suspense>

    </SpotlightBorder>
  );
}
