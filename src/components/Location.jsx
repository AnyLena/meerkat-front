import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";


const Location = ({ location }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  return (
    <section className="location">
      <h2 className="event-heading">Location</h2>
      <div className="text">
        <p>{location.description}</p>
      </div>

      {isLoaded && location.map && location.lat ? (
        <div className="map">
   
          <GoogleMap
            mapContainerClassName="map-container"
            center={{ lat: location.lat, lng: location.lng }}
            zoom={15}
            options={{ disableDefaultUI: true, zoomControl: true }}
          >
            <Marker position={{ lat: location.lat, lng: location.lng }} />
          </GoogleMap>
        </div>
      ) : null}
    </section>
  );
};

export default Location;
