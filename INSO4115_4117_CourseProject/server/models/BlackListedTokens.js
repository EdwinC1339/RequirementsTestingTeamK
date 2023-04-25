const mongoose = require("mongoose");

const blackListedTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      expires: 3600, // auto-delete document after 1 hour
    },
  },
  {
    collection: "blacklisted_tokens",
  }
);

module.exports = mongoose.model("blackListedToken", blackListedTokenSchema);
