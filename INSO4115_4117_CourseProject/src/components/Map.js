/* eslint import/no-webpack-loader-syntax: off */

import React, { useRef, useEffect, useState } from "react";
// eslint-disable-line import/no-webpack-loader-syntax;
import mapboxgl from "!mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import "./Map.css";

const key =
  "pk.eyJ1IjoiYWxvbnNvMTQiLCJhIjoiY2xmcm1scDM0MDVpMjN6bDhnenhleDI0dyJ9.WCGBtiA1Ij0EkiA6IpOgrA";
mapboxgl.accessToken = key;

const center = {
  lat:  18.46633000,
  lng: -66.10572000,
};



async function getPlaces(lat, lon, radius) {
  let apiURL =
    "https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/tilequery/" +
    lon +
    "," +
    lat +
    ".json?limit=50&layers=poi_label&&radius=" + radius + 
    "&access_token=" + 
    key;

  try {
    let result = (await fetch(apiURL, {method: "GET"})).json()
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}



async function searchPlaces(setPlaces, Map)   {
  //console.log("HOOPLA!!!!!!!!!!!!!!!!!!!!")
  const width = 0.8;
  const xSegments = 80;
  const height = 0.2;
  const ySegments = 50;
  for (let xoffset = -width; xoffset < width; xoffset += (width / xSegments) * 2) {
    for (let yoffset = -height; yoffset < height; yoffset += (height / ySegments) * 2) {
      
      let lat = center.lat + yoffset;
      let lon = center.lng + xoffset;
   
      let result = await getPlaces(lat, lon, "1000")
      const placesDict = {}
      for(let i = 0; i < result.features.length; i++){
        
        if (result.features[i].properties.class === "food_and_drink"){
          const el = document.createElement('div')
          el.className = 'marker'
          new mapboxgl.Marker(el).setLngLat(result.features[i].geometry.coordinates).addTo(Map)
          console.log(result.features[i]);
          //check if rest. with result.features[i].properties.category == "restaurant" ?? 
          placesDict[result.features[i].place_id] = result.features[i].properties.name;

        }
        //console.log(result.features[i])
          
        // const marker = new mapboxgl.Marker()
        // .setLngLat([result.features[i].center[0], result.features[i].center[1]])
        // .addTo(Map);
          
      }
      
      setPlaces(prevPlaces => ({...prevPlaces, ...placesDict}));  
    }
      
  }
};


const Map = () => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(-66.4411);
  const [lat, setLat] = useState(18.28);
  const [zoom, setZoom] = useState(8.5);
  const [places, setPlaces] = useState({}) // initially empty

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
      projection: { name: "mercator" }
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on("load", function() {
      // const geojson = {
      //   'type': 'FeatureCollection',
      //   'features': [
      //   {
      //   'type': 'Feature',
      //   'geometry': {
      //   'type': 'Point',
      //   'coordinates': [-66.10572000, 18.46633000]
      //   },
      //   'properties': {
      //   'title': 'Mapbox',
      //   'description': 'San Francisco, California'
      //   }
      //   }
      //   ]
      //   };
      
      // const el = document.createElement('div');
      // el.className = 'marker';
      // new mapboxgl.Marker(el).setLngLat(geojson.features[0].geometry.coordinates).setPopup(new mapboxgl.Popup({offset:25}).setHTML(
      //   `<h3>${geojson.features[0].properties.title}</h3><p>${geojson.features[0].properties.description}</p>`
      //   )).addTo(map)
      // console.log(map)
      map.resize();
      searchPlaces(setPlaces, map);
      
    });

    // map.on("click", function(ev) {
    //   $.get(
    //     "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    //       ev.lngLat.lon + "," + ev.lngLat.lat + ".json?access_token=" + mapboxgl.accessToken,
    //     function(data) {
    //       console.log(data);
    //     }
    //   ).fail(function(jqXHR, textStatus, errorThrown) {
    //     alert("There was an error while geocoding: " + errorThrown);
    //   });
    // });

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
