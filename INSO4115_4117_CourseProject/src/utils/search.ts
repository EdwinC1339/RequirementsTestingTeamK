// Interface to define Center Object
interface Center {
  lat: number;
  lng: number;
}

//Create center object
const center: Center = {
  lat: 28.1243,
  lng: -81.5777,
};

// Create apiURL string
const apiURL: string = ""
const key: string = "pk.eyJ1IjoiYWxvbnNvMTQiLCJhIjoiY2xmcm1scDM0MDVpMjN6bDhnenhleDI0dyJ9.WCGBtiA1Ij0EkiA6IpOgrA";
// Get Places helper function, returns a Promise
async function getPlaces(lat: number, lon: number, radius: string): Promise<any> {
  let apiURL: string =
  "https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/tilequery/" +
  lon +
  "," +
  lat +
  "&radius=" + radius + 
  ".json?limit=50&layers=poi_label&access_token=" +
  key;
  try {
    let result = (await fetch(apiURL, {method: "GET"})).json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}


// Updated searchPlaces function with more parameters
async function searchPlaces(setPlaces: any, width: number, xSegments: number, height: number, ySegments: number) {

  for (let xoffset = -width; xoffset < width; xoffset += (width / xSegments) * 2) {
    for (let yoffset = -height; yoffset < height; yoffset += (height / ySegments) * 2) {
      let lat = center.lat + yoffset;
      let lon = center.lng + xoffset;
      let result = await getPlaces(lat, lon, "100");
      console.log(result);
      const placesDict: { [key: string]: string } = {};
      for (let i = 0; i < result.features.length; i++) {
        placesDict[result.features[i].place_id] = result.features[i].place_name;
      }
      setPlaces((prevPlaces: any) => ({ ...prevPlaces, ...placesDict }));
    }
  }
}