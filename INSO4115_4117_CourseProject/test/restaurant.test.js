import Restaurant from "../src/node/restaurant.js" 
import util from "./util.js"

var fulfill1 = {
    "Kosher": true,
    "Vegan": false,
    "Nut": false
}
var fulfill2 = {
    "Kosher": false,
    "Vegan": false,
    "Nut": false
}
var fulfill3 = {
    "Kosher": true,
    "Vegan": true,
    "Nut": true,
    "Lactose Intolerant": true,
    "Gluten Free": true
}
var dummy1 = new Restaurant("FlavorCo", [142.4, 21.5], fulfill1)
var dummy2 = new Restaurant("Leamsi Cooking Ltd", [12.5, 21.3], fulfill2)
var dummy3 = new Restaurant("Godspeed You", [13, 12.1], fulfill3)

console.assert(dummy1.fulfills("Kosher") === true)
console.assert(dummy1.fulfills("Vegan") === false)
console.assert(dummy1.fulfills("Lactose Intolerant") === false)

console.assert(dummy2.fulfills("Kosher") === false)
console.assert(dummy2.fulfills("Vegan") === false)
console.assert(dummy2.fulfills("Lactose Intolerant") === false)

var gaf1 = dummy1.getAllFulfills()
console.assert(util.arr_equal_no_order(["Kosher"], gaf1), gaf1)
var gaf2 = dummy2.getAllFulfills()
console.assert(util.arr_equal_no_order([], gaf2))
var gaf3 = dummy3.getAllFulfills()
console.assert(util.arr_equal_no_order(["Kosher", "Vegan", "Nut", "Lactose Intolerant", "Gluten Free"], gaf3))

