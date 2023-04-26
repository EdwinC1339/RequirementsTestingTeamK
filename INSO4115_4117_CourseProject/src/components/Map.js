/* eslint import/no-webpack-loader-syntax: off */

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import municipalitiesJSON from "./municipalities.json";
import RatingComponent from "./Rating.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
const restriction_names = [
  "Halal",
  "Lactose Intolerant",
  "Nut Allergy",
  "Vegan",
  "Vegetarian",
];
const key =
  "pk.eyJ1IjoiYWxvbnNvMTQiLCJhIjoiY2xmcm1scDM0MDVpMjN6bDhnenhleDI0dyJ9.WCGBtiA1Ij0EkiA6IpOgrA";
mapboxgl.accessToken = key;

//18.229781, -66.390552

const center = {
  lat: 18.229781,
  lng: -66.390552,
};

async function fetchWithTimeoutAndDelay(resource, options = {}) {
  const { timeout, delay } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout + delay);
  const response = await new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(resource, {
        ...options,
        signal: controller.signal,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    }, delay);
  });
  clearTimeout(id);
  return response;
}

async function getPlaces(lat, lon, radius, delay) {
  let apiURL =
    "https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/tilequery/" +
    lon +
    "," +
    lat +
    ".json?limit=50&layers=poi_label&radius=" +
    radius +
    "&access_token=" +
    key;

  try {
    let result = (await fetch(apiURL)).json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function searchPlaces(setPlaces) {
  const width = 0.8;
  const xSegments = 40;
  const height = 0.195;
  const ySegments = 25;
  let delay = 0;
  for (
    let xoffset = -width;
    xoffset < width;
    xoffset += (width / xSegments) * 2
  ) {
    for (
      let yoffset = -height;
      yoffset < height;
      yoffset += (height / ySegments) * 2
    ) {
      let lat = center.lat + yoffset;
      let lon = center.lng + xoffset;

      getPlaces(lat, lon, "10000", delay)
        .then((result) => {
          for (let i = 0; i < result.features.length; i++) {
            if (result.features[i].properties.class === "food_and_drink") {
              //check if rest. with result.features[i].properties.category == "restaurant" ??
              const item = { [result.features[i].id]: result.features[i] };
              setPlaces((places) => Object.assign({}, places, item));
            }
          }
        })
        .catch((err) => console.error(err));
    }
    delay += ySegments * 30; // 30ms delay per query.
  }
}

async function getTown(coordinates) {
  const longitude = coordinates[0];
  const latitude = coordinates[1];
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${key}`;
  const response = await fetch(url);

  const body = await response.json();
  const address = body.features[0].place_name;
  const address_arr = address.split(",");
  let town = address_arr[address_arr.length - 2].trim();
  if (town === "Puerto Rico") {
    town = address_arr[address_arr.length - 3].trim();
  }
  return town;
}

const Map = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [lng, setLng] = useState(-66.4411);
  const [lat, setLat] = useState(18.28);
  const [zoom, setZoom] = useState(8.5);
  const [places, setPlaces] = useState({}); // initially empty
  const pbm = {};
  const municipalities = municipalitiesJSON.municipalities;
  municipalities.forEach((m) => (pbm[m] = []));
  const [placesByMunicipality, setPlacesByMunicipality] = useState(pbm); // Maps from each of the 78 municipality to an array of places
  const [currentPlace, setCurrentPlace] = useState({ name: "", location: "" });
  const [showRating, setShowRating] = useState(false); // state to track whether to show the RatingComponent

  // Initialize map when component mounts
  useEffect(() => {
    const m = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
      projection: { name: "mercator" },
    });

    setMap(m);

    // Add navigation control (the +/- zoom buttons)
    m.addControl(new mapboxgl.NavigationControl(), "top-right");

    m.on("move", () => {
      setLng(m.getCenter().lng.toFixed(4));
      setLat(m.getCenter().lat.toFixed(4));
      setZoom(m.getZoom().toFixed(2));
    });

    m.on("load", function () {
      console.log(municipalities);
      m.resize();
      searchPlaces(setPlaces, m);
    });

    // Clean up on unmount
    return () => m.remove();
  }, [mapContainerRef]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const markers = [];

    Object.values(places).forEach(async (place) => {
      const el = <div className="marker"></div>;
      const marker = new mapboxgl.Marker(el)
        .setLngLat(place.geometry.coordinates)
        .addTo(map);

      marker.getElement().addEventListener("click", async () => {
        console.log("Marker clicked");
        console.log("Current showRating state: ", showRating);
        setShowRating(true);
        const town = await getTown(place.geometry.coordinates);

        console.log(
          `Name: ${place.properties.name}, Location: ${place.geometry.coordinates}, Municipality: ${town}`
        );

        // Make a POST request to add the restaurant
        fetch("http://localhost:4000/api/add-restaurant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: place.properties.name,
            location: town,
          }),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Restaurant added successfully");
            } else {
              console.log("Failed to add restaurant");
            }
          })
          .catch((error) => {
            console.error("Error adding restaurant", error);
          });

        setCurrentPlace({ name: place.properties.name, location: town });
      });

      markers.push(marker);

      const town = await getTown(place.geometry.coordinates);
      setPlacesByMunicipality((prevState) => {
        const prevTownContent = prevState[town];
        const newPlaces = [...prevTownContent, place];
        return Object.assign({}, prevState, { [town]: newPlaces });
      });
    });

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [places]);

  useEffect(() => {
    console.log("Current showRating state: ", showRating);
  }, [showRating]);

  useEffect(() => {
    console.log("Current place changed: ", currentPlace);
  }, [currentPlace]);
  return (
    <div className="map-area">
      <div className="row">
        {showRating && (
          <div className="col-lg-3">
            <div className="container-fluid">
              <div className="rating">
                <RatingComponent
                  restaurantName={currentPlace.name}
                  location={currentPlace.location}
                />
                <button
                  className="btn btn-success"
                  onClick={() => setShowRating(!showRating)}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        )}
        <div className={showRating ? "col-lg-9" : "col-lg-12"}>
          <div className="sidebarStyle">
            <div>
              Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
          </div>
          <div
            className="map-container"
            ref={mapContainerRef}
            style={{ width: showRating ? "60%" : "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export { Map, getTown, getPlaces, searchPlaces };
