const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    original: {
      type: String,
      required: [true, "Url is required"],
    },
    short: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: {
        expires: "60m", // 1 hour
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Url", urlSchema);
