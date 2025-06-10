const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPassword: String,
  userCart: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  userDP: String,
});

module.exports = mongoose.model("user", userSchema);
