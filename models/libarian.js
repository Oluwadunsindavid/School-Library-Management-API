const mongoose = require("mongoose");

const liberianSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    staffId: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Liberian", liberianSchema);
