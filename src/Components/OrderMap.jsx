import Map ,{Source,Layer,Marker} from "@vis.gl/react-maplibre";
import PropTypes from "prop-types";

export default function OrderMap({route,selectedOrder}) {
  return (
   <div className="w-full rounded-xl shadow-md overflow-hidden min-h-96 flex-1 bg-boxclr">
          <Map initialViewState={{ longitude: selectedOrder?.origin.longitude || 0.1870, latitude: selectedOrder?.origin.latitude || 5.6037,zoom: 1}} style={{ width: "100%", height: "100%" }} mapStyle="https://demotiles.maplibre.org/style.json">
              {route && (
                <Source id="route" type="geojson" data={route}>
                  <Layer id="route-layer" type="line" layout={{ "line-join": "round", "line-cap": "round" }} paint={{ "line-color": "#ff0000", "line-width": 4 }}/>
                </Source>
              )}
              {selectedOrder && (
                <>
                  <Marker
                    longitude={selectedOrder.origin.longitude}
                    latitude={selectedOrder.origin.latitude}
                    anchor="bottom"
                  >
                    <div className="bg-[#1b54fe] text-white p-2 rounded-md text-xs shadow-md">
                      Source
                    </div>
                  </Marker>

                  <Marker
                    longitude={selectedOrder.destination.longitude}
                    latitude={selectedOrder.destination.latitude}
                    anchor="bottom"
                  >
                    <div className="bg-[#fc655f] text-white p-2 rounded-md text-xs shadow-md">
                      Destination
                    </div>
                  </Marker>
                </>
              )}
          </Map>  
    </div>
  )
}

OrderMap.propTypes = {
  route: PropTypes.object,
  selectedOrder: PropTypes.shape({
    origin: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    destination: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }),
};