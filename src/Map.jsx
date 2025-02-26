import  {Map, NavigationControl} from "@vis.gl/react-maplibre";
import 'maplibre-gl/dist/maplibre-gl.css'

export default function MapView() {
  return (
  <div className="w-full min-h-screen flex justify-center items-center">
    <Map initialViewState={{longitude:  0.1870, latitude:  5.6037, zoom: 1}} mapStyle="https://demotiles.maplibre.org/style.json">
      <NavigationControl />
    </Map>;
  </div>
  )
}
