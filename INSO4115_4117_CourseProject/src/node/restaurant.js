class Restaurant {
  constructor(name, latlon, restrictionFulfillment) {
    if (!name) {
      throw new Error("Name is required");
    }

    if (
      !latlon ||
      !Array.isArray(latlon) ||
      latlon.length !== 2 ||
      typeof latlon[0] !== "number" ||
      typeof latlon[1] !== "number" ||
      (typeof latlon[0] === "number" && typeof latlon[1] !== "number") ||
      (typeof latlon[0] !== "number" && typeof latlon[1] === "number")
    ) {
      throw new Error(
        "Coordinates must be an array of 2 numbers [latitude, longitude]"
      );
    }

    if (!restrictionFulfillment) {
      throw new Error("Fulfill object is required");
    }

    this.name = name;
    this.latlon = latlon;
    this.restrictionFulfillment = restrictionFulfillment;
  }

  getName() {
    return this.name;
  }

  getLatLon() {
    return this.latlon;
  }

  fulfills(restriction) {
    return Boolean(this.restrictionFulfillment[restriction]);
  }

  getAllFulfills() {
    var arr = [];
    for (const [key, value] of Object.entries(this.restrictionFulfillment)) {
      if (this.restrictionFulfillment[key]) {
        arr.push(key);
      }
    }
    return arr;
  }
}

export default Restaurant;
