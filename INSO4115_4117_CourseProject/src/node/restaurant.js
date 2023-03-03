class Restaurant {
    constructor(name, latlon, restrictionFulfillment) {
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
        return ["Kosher"];
    }
};

export default Restaurant