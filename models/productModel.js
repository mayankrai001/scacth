const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productImage: String,
  productName: String,
  productPrice: Number,
  productDiscount: {
    type: Number,
    default: 0,
  },
  productBgColor: String,
  prodductPanelColor: String,
  productTextColor: String,
});

module.exports = mongoose.model("product", productSchema);
