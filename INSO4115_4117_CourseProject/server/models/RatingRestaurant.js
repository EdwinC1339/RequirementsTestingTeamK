const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "ratings",
  }
);

module.exports = mongoose.model("Rating", ratingSchema);
