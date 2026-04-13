const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    dealType: {
      type: String,
      enum: [
        "DealsOfDay",
        "LastMinute",
        "LOS",
        "Family",
        "Corporate",
        "Group",
        "DayUse",
        "AdvanceBooking",
      ],
      required: true,
    },
    location: {
      type: String,
      enum: ["Chennai", "Ooty", "Both"],
      default: "Both",
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    customPrice: {
      type: String,
      default: "",
    },
    image: {
      type: String, // Base64 string for persistence
      required: true,
    },
    validFrom: {
      type: Date,
      default: Date.now,
    },
    validTo: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: Number,
      default: 0,
    },
    isPopup: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deal", dealSchema);
