const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: ["CHENNAI", "OOTY"],
    },
    type: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    epPrice: {
      type: String, // String to handle currency symbols if needed, or Number
    },
    cpPrice: {
      type: String,
    },
    price: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
