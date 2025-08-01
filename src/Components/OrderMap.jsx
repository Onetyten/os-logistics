import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { MapContainer,TileLayer,Polyline,Marker,Popup, useMap } from "react-leaflet";
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

export default function OrderMap({selectedOrder}) {

    
    const origin = useMemo(()=>{return {lat:selectedOrder?.origin.latitude,lng:selectedOrder?.origin.longitude} },[selectedOrder]) 
    const destination =  useMemo(()=>{return {lat:selectedOrder?.destination.latitude,lng:selectedOrder?.destination.longitude} },[selectedOrder]) 
    const [routeCoords,setRouteCoords] = useState([]);

    
    useEffect(()=>{

      if (!origin || !destination) return
      setRouteCoords([origin, destination])
    },[origin, destination])

    function FitBounds({ positions }) {
      const map = useMap();

      useEffect(() => {
        if (positions.length > 0) {
          map.fitBounds(positions);
        }
      }, [positions, map]);

      return null;
    }

    FitBounds.propTypes = {
    positions: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number)
    ).isRequired
  };





  return (
   <div className="w-full z-0 rounded-xl shadow-md overflow-hidden min-h-96 flex-1 bg-boxclr">
    <MapContainer center={origin} zoom={6} scrollWheelZoom={true} minZoom={1} maxZoom={15} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri"
        maxZoom={19}
      />
      
     {routeCoords.length > 0 && (
        <>
          <Polyline positions={routeCoords} pathOptions={{ color: "#1b54fe", weight: 3, opacity: 0.8 }} />
          <FitBounds positions={routeCoords} />
        </>
      )}

      <Marker position={origin} icon={originIcon}>
        <Popup>
          <b>Origin:</b> {selectedOrder?.origin?.city}, {selectedOrder?.origin?.country}
        </Popup>
      </Marker>

      <Marker position={destination} icon={destinationIcon}>
        <Popup>
          <b>Destination:</b> {selectedOrder?.destination.city}, {selectedOrder?.destination.country}
        </Popup>
      </Marker>

    </MapContainer>
  </div>
  )



  
}

OrderMap.propTypes = {
  route: PropTypes.object,
  selectedOrder: PropTypes.shape({
    origin: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      city:PropTypes.string,
      country:PropTypes.string
    }),
    destination: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      city:PropTypes.string,
      country:PropTypes.string
    }),
    current_location: {
      latitude: PropTypes.number,
      longitude:PropTypes.number,
    },
  }),
};



