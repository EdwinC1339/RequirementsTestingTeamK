import Restaurant from "../src/node/restaurant.js";
import util from "../src/util.js";
import fc from "fast-check";

test("Dummy restaurant 1", () => {
  const fulfill = {
    Kosher: true,
    Vegan: false,
    Nut: false,
  };
  const dummy = new Restaurant("FlavorCo", [142.4, 21.5], fulfill);
  expect(dummy.fulfills("Kosher")).toBeTruthy();
  expect(dummy.fulfills("Vegan")).toBeFalsy();
  expect(dummy.fulfills("Nut")).toBeFalsy();
  const gaf = dummy.getAllFulfills();
  expect(util.arr_equal_no_order(["Kosher"], gaf)).toBeTruthy();
});

test("Dummy restaurant 2", () => {
  const fulfill = {
    Kosher: false,
    Vegan: false,
    Nut: false,
  };
  const dummy = new Restaurant("Leamsi Cooking Ltd", [12.5, 21.3], fulfill);
  expect(dummy.fulfills("Kosher")).toBeFalsy();
  expect(dummy.fulfills("Vegan")).toBeFalsy();
  expect(dummy.fulfills("Nut")).toBeFalsy();
  const gaf = dummy.getAllFulfills();
  expect(util.arr_equal_no_order([], gaf)).toBeTruthy();
});

test("Dummy restaurant 3", () => {
  const fulfill = {
    Kosher: true,
    Vegan: true,
    Nut: true,
    "Lactose Intolerant": true,
    "Gluten Free": true,
  };
  const dummy = new Restaurant("Leamsi Cooking Ltd", [12.5, 21.3], fulfill);
  expect(dummy.fulfills("Kosher")).toBeTruthy();
  expect(dummy.fulfills("Vegan")).toBeTruthy();
  expect(dummy.fulfills("Nut")).toBeTruthy();
  expect(dummy.fulfills("Lactose Intolerant")).toBeTruthy();
  expect(dummy.fulfills("Gluten Free")).toBeTruthy();
  const gaf = dummy.getAllFulfills();
  expect(
    util.arr_equal_no_order(
      ["Kosher", "Vegan", "Nut", "Lactose Intolerant", "Gluten Free"],
      gaf
    )
  ).toBeTruthy();
});

describe("Restaurant", () => {
  // Test 1: Should create a restaurant with valid input
  it("should create a restaurant with valid input", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }), // name
        fc.tuple(fc.float(-90, 90), fc.float(-180, 180)), // latlon
        fc.record({
          Kosher: fc.boolean(),
          Vegan: fc.boolean(),
          Nut: fc.boolean(),
          "Lactose Intolerant": fc.boolean(),
          "Gluten Free": fc.boolean(),
        }), // fulfill
        (name, latlon, fulfill) => {
          const restaurant = new Restaurant(name, latlon, fulfill);
          expect(restaurant).toBeInstanceOf(Restaurant);
        }
      )
    );
  });
});

// Test 2: Should throw an error if name is not provided
it("should throw an error if name is not provided", () => {
  expect(() => new Restaurant()).toThrow("Name is required");
});

// Test 3: Should throw an error if latitude is not a number
it("should throw an error if latitude is not a number", () => {
  expect(() => new Restaurant("Test", ["invalid", 0], {})).toThrow(
    "Coordinates must be an array of 2 numbers [latitude, longitude]"
  );
});

// Test 4: Should throw an error if longitude is not a number
it("should throw an error if longitude is not a number", () => {
  expect(() => new Restaurant("Test", [0, "invalid"], {})).toThrow(
    "Coordinates must be an array of 2 numbers [latitude, longitude]"
  );
});

// Test 5: Should throw an error if fulfill is not provided
it("should throw an error if fulfill is not provided", () => {
  expect(() => new Restaurant("Test", [0, 0])).toThrow(
    "Fulfill object is required"
  );
});
