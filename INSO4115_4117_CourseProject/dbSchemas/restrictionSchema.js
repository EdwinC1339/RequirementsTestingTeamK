import mongoose from "mongoose";

const Schema = mongoose.Schema;

const restriction = new Schema(
  {
    restriction: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Restriction = mongoose.model("Restriction", restriction);

export default Restriction;
