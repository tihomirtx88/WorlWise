/* eslint-disable */

import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";

import useGGeolocation from "../hooks/useGGeolocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";

export default function Map() {
  const [lat, lng] = useUrlPosition();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState({ lat: null, lng: null });
  const {
    isLoading: isLoadingPosition,
    positon: geolocationPosition,
    getPosition,
  } = useGGeolocation();

  // Set position in state
  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {/* <h1>Map</h1>
           <h1>Position: {lat} {lng}</h1>
           <button onClick={()=>{
             setSearchParams({lat: 23, lng:50});
           }}>On change position</button> */}

      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use your position"}
      </Button>

      <MapContainer

        center={mapPosition}
        // center={[lat,lng]}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          const lontitude = city.position.lng
          const latitude = city.position.lat

          if (lontitude && latitude) {
            return (
              <Marker
                position={[city.position.lat, city.position.lng]}
                key={city.id}
              >
                <Popup>
                  <span>{city.emoji}</span>
                  <span>{city.cityName}</span>
                </Popup>
              </Marker>
            )
          }
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
