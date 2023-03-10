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
        var arr = [];
        for (const [key, value] of Object.entries(this.restrictionFulfillment)) {
            if (this.restrictionFulfillment[key]) {
                arr.push(key);
            }
        }
        return arr;
    }
};

export default Restaurant;