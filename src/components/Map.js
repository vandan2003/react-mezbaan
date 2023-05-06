import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./css/Map.css"


export default function Map({restaurant}) {
    const [position, setPosition] = useState([restaurant.address.lattitude, restaurant.address.longitude]);
  
    useEffect( () => {
      
    }, []);
  
    const customMarker = new L.Icon({
      iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    
  
    return (
      <MapContainer
        center={position}
        zoom={17}
        id="my-map"
      >
        <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={customMarker}>
          <Popup>{restaurant.name}</Popup>
        </Marker>
      </MapContainer>
    );
  }
    