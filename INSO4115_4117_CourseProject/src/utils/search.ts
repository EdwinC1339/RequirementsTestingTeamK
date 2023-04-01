
import $ from "jquery";
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

// Get Places helper function, returns a Promise
async function getPlaces(lat: number, lon: number, radius: string, apiURL: string): Promise<any> {

  try {
    let result = await $.get(apiURL);
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
      let result = await getPlaces(lat, lon, "100", apiURL);
      console.log(result);
      const placesDict: { [key: string]: string } = {};
      for (let i = 0; i < result.features.length; i++) {
        placesDict[result.features[i].place_id] = result.features[i].place_name;
      }
      setPlaces((prevPlaces: any) => ({ ...prevPlaces, ...placesDict }));
    }
  }
}
