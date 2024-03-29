const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
  buyCart:[],
  buyProductsCart:[]
});

const User = mongoose.model('users',userSchema) 
module.exports = User;
