import mongoose from "mongoose";
import {Client} from '@googlemaps/google-maps-services-js';
import fs from 'fs';
import dotenv from "dotenv";
import path from 'path';
import * as url from 'url';
import Restaurant from '../../dbSchemas/restaurantSchema.js'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


const envPath = path.join(__dirname, '../../.env');

dotenv.config({ path: envPath })
const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


async function getPlacesByID() {
    const filename = 'restaurantIDs.json';
    const places = [];
    try {
        // Getting the first 50 IDs into an array
        const data = fs.readFileSync(filename, 'utf8');
        const jsonData = JSON.parse(data);
        const IDs = Object.keys(jsonData.value).slice(0, 50);

        // Create Google API Client
        const client = new Client({});

        // Hold our promises to resolve later
        const promises = [];

        IDs.forEach(ID => {
            const promise = client.placeDetails({
                params: {
                    place_id: ID,
                    key
                }
            })
            .then(res => {
                const place = res.data.result;
                const location = {
                    type: 'Point',
                    coordinates: [
                        place.geometry.location.lng, 
                        place.geometry.location.lat
                    ]
                }
                const restaurant = {
                    name: place.name,
                    apiToken: place.place_id,
                    location
                }
                places.push(restaurant);
            })
            .catch(err => console.error(err));
            promises.push(promise);
        });

        await Promise.all(promises)
        .then(() => {
            console.log(`Processed ${places.length} places`);
          })
          .catch((err) => {
            console.error(`Error processing promises: ${err}`);
          });


        return places;

    } catch (err) {
        console.error(`Error parsing JSON data from file: ${filename}`);
        console.error(err);
    }
}

async function main() {
    const username = process.env.MONGO_USER;
    const password = process.env.MONGO_PASSWORD;

    await mongoose.connect(
        `mongodb+srv://${username}:${password}@cetpr.tcwjqvy.mongodb.net/?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );

    const places = await getPlacesByID();

    Restaurant.collection.drop()
    .then(res => {
        places.forEach(place => {
            const doc = new Restaurant(place);
            doc.save();
        });
    })
    .catch(err => console.error(err));

    
}

main().catch(err => console.error(err))
