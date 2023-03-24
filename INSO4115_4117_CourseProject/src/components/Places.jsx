import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {google} from 'googleapis'

function Places() {
    const [places, setPlaces] = useState([]);

    useEffect(() =>{
        const fetchPlaces = async () => {
            const res = await axios.get('api/places', {
                params: {
                    latitude: 18.266,
                    longitude: -66.406
                }
            })
        }
    })
}