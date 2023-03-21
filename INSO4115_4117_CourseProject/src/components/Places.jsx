import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Places() {
    const [places, setPlaces] = useState([]);

    useEffect(() =>{
        const fetchPLaces = async () => {
            const res = await axios.get('api/places', {
                params: {
                    latitude: 18.266,
                    longitude: -66.406
                }
            })
        }
    })
}