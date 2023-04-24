import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";



export default function Map() {
    const [position, setPosition] = useState([22.7191, 75.8797]);

  
    useEffect( () => {
      const watchId = navigator.geolocation.watchPosition(
        async(position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => console.log(error),
        { enableHighAccuracy: true }
      );
  
      return () => navigator.geolocation.clearWatch(watchId);
    }, []);
  
    const customMarker = new L.Icon({
      iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    
  
    return (
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "300px", width: "70%" , borderRadius:"10px" , boxShadow:"0px 0px 5px 1px" , zIndex:"0"}}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={customMarker}>
          <Popup>Your current location</Popup>
        </Marker>
      </MapContainer>
    );
  }
    