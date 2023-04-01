const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema(
  {
    image: String,
  },
  {
    collection: "ImageDetails",
  }
);

module.exports = mongoose.model("ImageDetails", ImageDetailsScehma);
