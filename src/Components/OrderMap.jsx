import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

const DEFAULT_CENTER = { lat: 20, lng: 0 };
const DEFAULT_ZOOM = 6;

export default function OrderMap({ selectedOrder }) {
  const isValidCoordinate = (lat, lng) => {
    return (
      typeof lat === 'number' && 
      typeof lng === 'number' && 
      !isNaN(lat) && 
      !isNaN(lng) &&
      lat >= -90 && 
      lat <= 90 && 
      lng >= -180 && 
      lng <= 180
    );
  };

  const origin = useMemo(() => {
    const lat = selectedOrder?.origin?.latitude;
    const lng = selectedOrder?.origin?.longitude;
    if (isValidCoordinate(lat, lng)) {
      return { lat, lng };
    }
      return null;
    }, [selectedOrder]);

  const destination = useMemo(() => {
    const lat = selectedOrder?.destination?.latitude;
    const lng = selectedOrder?.destination?.longitude;
    
    if (isValidCoordinate(lat, lng)) {
      return { lat, lng };
    }
    return null;
  }, [selectedOrder]);

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
      return 6; // Show both points
    } else if (origin || destination) {
      return 8; // Show single point
    }
    return DEFAULT_ZOOM; // World view
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

  // Early return if no valid data
  if (!selectedOrder) {
    return (
      <div className="w-full z-0 rounded-xl shadow-md overflow-hidden min-h-96 flex-1 bg-boxclr flex items-center justify-center">
        <p className="text-textclr">No order selected</p>
      </div>
    );
  }

  return (
    <div className="w-full z-0 rounded-xl shadow-md overflow-hidden min-h-96 flex-1 bg-boxclr">
      <MapContainer  center={mapCenter}  zoom={mapZoom}  scrollWheelZoom={true}  minZoom={1}  maxZoom={15}  style={{ height: "100%", width: "100%" }} key={`${selectedOrder?.id || 'default'}-${origin?.lat || 0}-${destination?.lat || 0}`}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri"
          maxZoom={19}
        />
        
        {routeCoords.length > 0 && (
          <>
            <Polyline  positions={routeCoords}  pathOptions={{ color: "#1b54fe", weight: 3, opacity: 0.8 }} />
            <FitBounds positions={routeCoords} />
          </>
        )}
        
        {origin && (
          <Marker position={origin} icon={originIcon}>
            <Popup>
              <b>Origin:</b> {selectedOrder?.origin?.city || 'Unknown'}, {selectedOrder?.origin?.country || 'Unknown'}
            </Popup>
          </Marker>
        )}
        
        {destination && (
          <Marker position={destination} icon={destinationIcon}>
            <Popup>
              <b>Destination:</b> {selectedOrder?.destination?.city || 'Unknown'}, {selectedOrder?.destination?.country || 'Unknown'}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

OrderMap.propTypes = {
  selectedOrder: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    origin: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      city: PropTypes.string,
      country: PropTypes.string
    }),
    destination: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      city: PropTypes.string,
      country: PropTypes.string
    }),
    current_location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }),
};