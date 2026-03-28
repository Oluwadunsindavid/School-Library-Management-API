const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    isbn: { type: String, unique: true },

    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }], //reference other models. Here, the authors' table. It is case sensitive

    status: {
      type: String,
      enum: ["IN", "OUT"],
      // Let's make IN the default
      default: "IN",
    },

    borrowedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },

    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Liberian",
      default:null,
    },

    // default date to null since it is not borrowed
    returnDate: { type: Date, default: null },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Book", bookSchema);
