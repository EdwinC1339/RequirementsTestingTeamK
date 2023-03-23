import mongoose from "mongoose";

const Schema = mongoose.Schema;

const restaurant = new Schema(
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
    coordinates: {
      type: [Double],
      required: true,
    },
    votes: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurant);

export default Restaurant;
