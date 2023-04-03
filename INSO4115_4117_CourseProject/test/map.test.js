import React from 'react'
import renderer from 'react-test-renderer'
import jest from 'jest'

import {getPlaces, getTown, Map} from '../src/components/Map.js'

beforeEach(() => {
    fetch.resetMocks();
});

const dummy = {name : "dummy feature"}

test('getPlaces returns at least 1 place in San Juan', async () => {
    fetch.mockResponceOnce(JSON.stringify({
        features: [
            dummy
        ]
    }));
    getPlaces(18.412025, -66.026585, 1000, 0).then(result => {
        const feature_length = result.features.length;
        expect(feature_length).toBeGreaterThanOrEqual(1);
    });
});

test('getPlaces returns at least 1 place in Humacao', async () => {
    fetch.mockResponceOnce(JSON.stringify({
        features: [
            dummy
        ]
    }));
    getPlaces(18.150081, -65.827286, 1000, 0).then(result => {
        const feature_length = result.features.length;
        expect(feature_length).toBeGreaterThanOrEqual(1);
    });
});

test('getPlaces returns at least 1 place in Ponce', async () => {
    fetch.mockResponceOnce(JSON.stringify({
        features: [
            dummy
        ]
    }));
    getPlaces(18.009049, -66.596319, 1000, 0).then(result => {
        const feature_length = result.features.length;
        expect(feature_length).toBeGreaterThanOrEqual(1);
    });
});

test('getPlaces returns at least 1 place in Mayagüez', async () => {
    fetch.mockResponceOnce(JSON.stringify({
        features: [
            dummy
        ]
    }));
    getPlaces(18.203009, -67.145275, 1000, 0).then(result => {
        const feature_length = result.features.length;
        expect(feature_length).toBeGreaterThanOrEqual(1);
    });
});

test('getTown finds the town of a restaurant in Cidra', async () => {
    const [lat, lon] = [18.17652648618649, -66.16579249618928];
    getTown([
        lon,
        lat
    ]).then(town => expect(town).toEqual("Cidra"));
})

test('getTown finds the town of a restaurant in Lares', async () => {
    const [lat, lon] = [18.294479009006434, -66.87748836709393];
    getTown([
        lon,
        lat
    ]).then(town => expect(town).toEqual("Lares"));
})

test('getTown finds the town of a restaurant in Arecibo', async () => {
    const [lat, lon] = [18.437000598160765, -66.71322572616934];
    getTown([
        lon,
        lat
    ]).then(town => expect(town).toEqual("Arecibo"));
})

test('getTown finds the town of a restaurant in Aguada', async () => {
    const [lat, lon] = [18.386663164194506, -67.17364732018436];
    getTown([
        lon,
        lat
    ]).then(town => expect(town).toEqual("Aguada"));
})