const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPassword: String,
  userCart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  userDP: String,
});

module.exports = mongoose.model("user", userSchema);
