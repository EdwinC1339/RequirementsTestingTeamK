import Restaurant from "../src/node/restaurant.js" 
import util from "./util.js"

test('Dummy restaurant 1', () => {
    const fulfill = {
        "Kosher": true,
        "Vegan": false,
        "Nut": false
    }
    const dummy = new Restaurant("FlavorCo", [142.4, 21.5], fulfill);
    expect(dummy.fulfills("Kosher")).toBeTruthy();
    expect(dummy.fulfills("Vegan")).toBeFalsy();
    expect(dummy.fulfills("Nut")).toBeFalsy();
    const gaf = dummy.getAllFulfills();
    expect(util.arr_equal_no_order(
        ["Kosher"],
         gaf))
    .toBeTruthy();
})

test('Dummy restaurant 2', () => {
    const fulfill = {
        "Kosher": false,
        "Vegan": false,
        "Nut": false
    }
    const dummy = new Restaurant("Leamsi Cooking Ltd", [12.5, 21.3], fulfill);
    expect(dummy.fulfills("Kosher")).toBeFalsy();
    expect(dummy.fulfills("Vegan")).toBeFalsy();
    expect(dummy.fulfills("Nut")).toBeFalsy();
    const gaf = dummy.getAllFulfills();
    expect(util.arr_equal_no_order(
        [],
         gaf))
    .toBeTruthy();
})

test('Dummy restaurant 3', () => {
    const fulfill = {
        "Kosher": true,
        "Vegan": true,
        "Nut": true,
        "Lactose Intolerant": true,
        "Gluten Free": true
    }
    const dummy = new Restaurant("Leamsi Cooking Ltd", [12.5, 21.3], fulfill);
    expect(dummy.fulfills("Kosher")).toBeTruthy();
    expect(dummy.fulfills("Vegan")).toBeTruthy();
    expect(dummy.fulfills("Nut")).toBeTruthy();
    expect(dummy.fulfills("Lactose Intolerant")).toBeTruthy();
    expect(dummy.fulfills("Gluten Free")).toBeTruthy();
    const gaf = dummy.getAllFulfills();
    expect(util.arr_equal_no_order(
        ["Kosher", "Vegan", "Nut", "Lactose Intolerant", "Gluten Free"],
         gaf))
    .toBeTruthy();
})
