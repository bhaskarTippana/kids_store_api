const mongoose = require("mongoose");

const User = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: [],
  wishlist: [],
});

module.exports = mongoose.model("users", User);
