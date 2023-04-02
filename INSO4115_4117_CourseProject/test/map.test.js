import React from 'react'
import renderer from 'react-test-renderer'
import jest from 'jest'

import {getPlaces, getTown, Map} from '../src/components/Map.js'

test('getPlaces returns at least 1 place in San Juan', async () => {
    getPlaces(18.412025, -66.026585, 1000, 0).then(result => {
        const feature_length = result.features.length;
        expect(feature_length).toBeGreaterThanOrEqual(1);
    });
});

test('getPlaces returns at least 1 place in Humacao', async () => {
    getPlaces(18.150081, -65.827286, 1000, 0).then(result => {
        const feature_length = result.features.length;
        expect(feature_length).toBeGreaterThanOrEqual(1);
    });
});

test('getPlaces returns at least 1 place in Ponce', async () => {
    getPlaces(18.009049, -66.596319, 1000, 0).then(result => {
        const feature_length = result.features.length;
        expect(feature_length).toBeGreaterThanOrEqual(1);
    });
});

test('getPlaces returns at least 1 place in Mayagüez', async () => {
    getPlaces(18.203009, -67.145275, 1000, 0).then(result => {
        const feature_length = result.features.length;
        expect(feature_length).toBeGreaterThanOrEqual(1);
    });
});

