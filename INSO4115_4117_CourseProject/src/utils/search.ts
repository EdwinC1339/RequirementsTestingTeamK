type Latitude = number & { __latitudeBrand: true };
type Longitude = number & {__longitudeBrand: true}

function createLatitude(latitude: number): Latitude {
  if (latitude < -180 || latitude > 180) {
    throw new Error("Invalid latitude value. Must be between -180 and 180.");
  }
  return latitude as Latitude;
}

function createLongitude(longitude: number): Longitude {
  if (longitude < -180 || longitude > 180) {
    throw new Error("Invalid latitude value. Must be between -180 and 180.");
  }
  return longitude as Longitude;
}

type Position = {
  lat: Latitude;
  lon: Longitude;
}

function createPosition(lat: Latitude, lon: Longitude): Position {
  return {
    lat, lon
  } as Position
}

type AccessToken = `pk.${string}.${string}`
type apiURL = `https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/tilequery/${Longitude},${Latitude}.json?limit=50&layers=poi_label&radius=${number}&access_token=${AccessToken}`;

//Create center object
const center: Position = createPosition(createLatitude(28.1243), createLongitude(-81.5777));

// Create apiURL string
const key: AccessToken = "pk.eyJ1IjoiYWxvbnNvMTQiLCJhIjoiY2xmcm1scDM0MDVpMjN6bDhnenhleDI0dyJ9.WCGBtiA1Ij0EkiA6IpOgrA";
// Get Places helper function, returns a Promise
async function getPlaces(lat: Latitude, lon: Longitude, radius: number): Promise<any> {
  let url: apiURL =
  `https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/tilequery/${lon},${lat}.json?limit=50&layers=poi_label&radius=${radius}&access_token=${key}`;
  try {
    let result = (await fetch(url, {method: "GET"})).json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}


// Updated searchPlaces function with more parameters
async function searchPlaces(setPlaces: Function, width: number, xSegments: number, height: number, ySegments: number) {

  for (let xoffset = -width; xoffset < width; xoffset += (width / xSegments) * 2) {
    for (let yoffset = -height; yoffset < height; yoffset += (height / ySegments) * 2) {
      let lat = createLatitude(center.lat + yoffset);
      let lon = createLongitude(center.lon + xoffset);
      let result = await getPlaces(lat, lon, 100);
      console.log(result);
      const placesDict: { [key: string]: string } = {};
      for (let i = 0; i < result.features.length; i++) {
        placesDict[result.features[i].place_id] = result.features[i].place_name;
      }
      setPlaces((prevPlaces: any) => ({ ...prevPlaces, ...placesDict }));
    }
  }
}

export {}