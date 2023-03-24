import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  LoadScript
} from "@react-google-maps/api";
import * as dotenv from "dotenv";
// import google from 'googleapis'

const google = window.google = window.google ? window.google : {}

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
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map);
