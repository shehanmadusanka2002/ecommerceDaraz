const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  rating: Number,
  image: String, // filename
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
