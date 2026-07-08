const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: true,
    },
    cropArea: {
      type: Number,
      required: true,
    },
    cropStatus: {
      type: String,
      required: true,
    },
    cropPlace: {
      type: String,
      required: true,
    },

    // ✅ NEW FIELD ADDED
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Crop", cropSchema);
