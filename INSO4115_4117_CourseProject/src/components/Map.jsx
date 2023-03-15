import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import * as dotenv from 'dotenv'

dotenv.config()

const containerStyle = {
  width: '60rem',
  height: '35rem'
};

const center = {
  lat: 18.266,
  lng: -66.406
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    let request = {
      query: "Museum of Contemporary Art Australia",
      fields: ["name", "geometry"]
    };

    // let service = new google.maps.places.PlacesService(map);

    // service.findPlaceFromQuery(request, (results, status) => {
    //   if (status === google.maps.places.PlacesServiceStatus.OK) {
    //     for (var i = 0; i < results.length; i++) {
    //       coords.push(results[i]);
    //     }

    //     this.setState({
    //       center: results[0].geometry.location,
    //       coordsResult: coords
    //     });
    //   }
    // });
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={9}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)