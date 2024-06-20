const mongoose = require("mongoose");

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
  myOrders: {
    type: Array,
    default: [],
  },
  address: {
    street: {
      type: String,
      default:""
    },
    city: {
      type: String,
        default:""
    },
    state: {
      type: String,
        default:""
    },
    postalCode: {
      type: String,
        default:""
    },
    country: {
      type: String,
        default:""
    },
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
