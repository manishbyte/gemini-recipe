// models/FoodSelection.js
const mongoose = require("mongoose");

const foodSelectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  days: [
    {
      day: { type: String, required: true }, // e.g., "Monday"
      breakfast: [{ type: String }],
      lunch: [{ type: String }],
      dinner: [{ type: String }],
    },
  ],
});

module.exports = mongoose.model("FoodSelection", foodSelectionSchema);
