import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const LoadMap = ({ coords, center }) => {
  console.log(coords);
  console.log(center);
  // console.log(typeof center[0]);
  //console.log(coords.coords.split(","));
  return (
    <MapContainer center={center} zoom={2} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coords}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LoadMap;
