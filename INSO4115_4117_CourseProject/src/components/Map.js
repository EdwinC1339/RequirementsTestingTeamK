/* eslint import/no-webpack-loader-syntax: off */

import React, { useRef, useEffect, useState } from "react";
// eslint-disable-line import/no-webpack-loader-syntax;
import mapboxgl from "!mapbox-gl";
import "./Map.css";

const key =
  "pk.eyJ1IjoiYWNldmVkb2MxNyIsImEiOiJjbGZzamJoeGYwNmwzM2dscXd4cnB3NHdwIn0.G2m7R5Q-853sLB3kr6pBbw";
mapboxgl.accessToken = key;

const center = {
  lat: 18.266,
  lng: -66.406,
};

async function getPlaces(lat, lon, callback) {
  // maybe change API to use https://nominatim.org/release-docs/develop/api/Reverse/
  let apiURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    lon +
    "," +
    lat +
    ".json?access_token=" +
    key;

  return (await fetch(apiURL)).json()
};


const searchPlaces = (setPlaces) => {
  const width = 0.8;
  const xSegments = 40;
  const height = 0.2;
  const ySegments = 20;
  for (let xoffset = -width; xoffset < width; xoffset += (width / xSegments) * 2) {
    for (let yoffset = -height; yoffset < height; yoffset += (height / ySegments) * 2) {
      
      let lat = center.lat + yoffset;
      let lon = center.lng + xoffset;

      let result = getPlaces(lat, lon)
      console.log(result)

      const placesDict = {}
      
      for(let i = 0; i < result.features; i++){
        
        let isPOI = result.features[i].place_type == "poi"
        
        if(isPOI){
          
          //check if rest. with result.features[i].properties.category == "restaurant" ?? 
          placesDict[result.features[i].place_id] = result.features[i].place_name
          
          const marker = new mapboxgl.Marker()
          .setLngLat([result.features[i].center[0], result.features[i].center[1]])
          .addTo(Map);
        }
      }
      
      setPlaces(prevPlaces => Object.assign({}, prevPlaces, placesDict));  
    }
      
  }
};


const Map = () => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(-66.4411);
  const [lat, setLat] = useState(18.28);
  const [zoom, setZoom] = useState(9.1);
  const [places, setPlaces] = useState({}) // initially empty

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/acevedoc17/clfsjfv6e00cx01mxl400z732/draft",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on("load", function() {
      map.resize();
      
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="sidebarStyle">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;
