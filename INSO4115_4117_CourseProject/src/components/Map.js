/* eslint import/no-webpack-loader-syntax: off */

import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-line import/no-webpack-loader-syntax;
import mapboxgl from '!mapbox-gl'; 
import './Map.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWNldmVkb2MxNyIsImEiOiJjbGZzamJoeGYwNmwzM2dscXd4cnB3NHdwIn0.G2m7R5Q-853sLB3kr6pBbw';

const Map = () => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(-66.4411);
  const [lat, setLat] = useState(18.28);
  const [zoom, setZoom] = useState(9.10);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on('load', function () {
      map.resize();
  });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;
