import {fuzz, preset} from 'fuzzing';


async function getPlaces(lat, lon, radius) {
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

const errors = await fuzz(getPlaces)
   .under(preset.number(),preset.number(),preset.number())
   .errors();

console.log(errors);