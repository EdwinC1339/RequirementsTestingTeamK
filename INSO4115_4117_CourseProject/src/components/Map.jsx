import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  LoadScript
} from "@react-google-maps/api";
import * as dotenv from "dotenv";
import {ThreeDots} from 'react-loader-spinner'
// import google from 'googleapis'

// const google = window.google = window.google ? window.google : {}

dotenv.config();

const containerStyle = {
  width: "70rem",
  height: "35rem",
};

const center = {
  lat: 18.266,
  lng: -66.406,
};

function Map() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  const [places, setPlaces] = useState({});

  const onLoad = (mapInstance) => {
    const placesService = new window.google.maps.places.PlacesService(mapInstance);

    const width = 1
    const xSegments = 3
    const height = 0.3
    const ySegments = 7
    for (let xoffset = -width; xoffset < width; xoffset += width / xSegments * 2) {
      for (let yoffset = -height; yoffset < height; yoffset += height / ySegments * 2) {
        const location = {
          lat: center.lat + yoffset,
          lng: center.lng + xoffset
        }
        const request = {
          location,
          radius: 100000, // Search within a 1000-meter radius
          type: 'restaurant',
        };
    
        placesService.nearbySearch(request, (results, status, pagination) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {

            const placesDict = {}
            results.forEach((place) =>{
              placesDict[place.place_id] = place
            })

            setPlaces(prevPlaces => Object.assign({}, prevPlaces, placesDict));
            if (pagination.hasNextPage) {
              pagination.nextPage();
            }
          } else {
            console.error(status)
          }
          
        });

      }
    }

  };

  const renderMarkers = () => {
    return Object.values(places).map(place => (
      <Marker
        key={place.place_id}
        position={place.geometry.location}
      />
    ));
  };

  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
      >
        {renderMarkers()}
      </GoogleMap>
    );
  };

  return isLoaded ? renderMap() : <ThreeDots 
  height="80" 
  width="80" 
  radius="9"
  color="#4fa94d" 
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
   />
}

export default React.memo(Map);
