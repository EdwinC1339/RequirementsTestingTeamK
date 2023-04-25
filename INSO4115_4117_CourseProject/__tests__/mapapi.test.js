import {fuzz, preset} from 'fuzzing';
import fetch from 'node-fetch';
const key = "pk.eyJ1IjoiYWxvbnNvMTQiLCJhIjoiY2xmcm1scDM0MDVpMjN6bDhnenhleDI0dyJ9.WCGBtiA1Ij0EkiA6IpOgrA";

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
    let result = (await (fetch(apiURL, {method: "GET"}))).json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

const errors = await fuzz(getPlaces)
    .under(preset.string(), preset.number(), preset.number())
    .errors()

console.log(errors);
