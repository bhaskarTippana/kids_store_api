const mongoose = require("mongoose");

// Define the address schema
const addressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
      match: /^[0-9]{5}(-[0-9]{4})?$/,
    },
    country: {
      type: String,
      required: true,
      enum: ["USA", "Canada", "Mexico"],
    },
  },
  {
    _id: false, // Prevents creation of _id field for subdocuments
  }
);

// Define the user schema
const userSchema = new mongoose.Schema({
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
  cart: {
    type: Array,
    default: [],
  },
  wishlist: {
    type: Array,
    default: [],
  },
  buyCart: {
    type: Array,
    default: [],
  },
  buyProductsCart: {
    type: Array,
    default: [],
  },
  address: addressSchema,
});

const User = mongoose.model("users", userSchema);
module.exports = User;
