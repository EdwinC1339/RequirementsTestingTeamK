import mongoose from "mongoose";

const Schema = mongoose.Schema;

const user = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    hash: {
      type: String,
      required: true,
    },
    restrictions: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", user);

export default User;
