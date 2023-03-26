import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    apiToken: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number], // LONGITUDE THEN LATITUDE
        required: true
      }
    },
    votes: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
export default Restaurant;
