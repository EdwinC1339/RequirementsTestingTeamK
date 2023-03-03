import Restaurant from "../src/node/restaurant.js" 

var fulfill1 = {
    "Kosher": true,
    "Vegan": false,
    "Nut": false
}
var dummy1 = new Restaurant("FlavorCo", [142.4, 21.5], fulfill1)

console.assert(dummy1.fulfills("Kosher") == true)
console.assert(dummy1.fulfills("Vegan") == false)
console.assert(dummy1.fulfills("Lactose Intolerant") == false)


