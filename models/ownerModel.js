const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    minlength: 3,
    trim: true,
  },
  ownerEmail: String,
  ownerPassword: String,
  ownerContact: Number,
  products: {
    type: Array,
    default: [],
  },
  ownerDP: String,
  gstin: String,
});

module.exports = mongoose.model("owner", ownerSchema);
