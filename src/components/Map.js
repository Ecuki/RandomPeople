// import PropTypes from "prop-types";
import React from "react";

import "leaflet/dist/leaflet.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
let icon = L.icon({
  iconRetinaUrl: require("../assets/marker-icon-2x.png"),
  iconUrl: require("../assets/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

function MyMap(props) {
  const { coordinates } = props;
  const zoom = 12;
  const position = [coordinates.latitude * 1, coordinates.longitude * 1];

  const myMap = (
    <Map center={position} zoom={zoom} id="map" className="map">
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={icon}>
        <Popup>Somewhere in the world</Popup>
      </Marker>
    </Map>
  );
  return myMap;
}

export default MyMap;
