const express = require("express");
const userRouter = express.Router();
const register = require("../controllers/register.js");
const login = require("../controllers/login.js");
const getUsers = require("../controllers/getUser.js")
const cart = require("../controllers/cart.js");
const buyCart = require("../controllers/buyCart.js")
const addCart = require("../controllers/addCart.js");
const getCartProducts = require("../controllers/getCartProducts.js");
const cartLength = require("../controllers/CartLength.js");
const addWishlist = require("../controllers/addWishlist.js");
const getWishlist = require("../controllers/getWishlist.js");
const isAuthenticate = require('../controllers/authController.js');





userRouter.post("/register", register);
userRouter.post("/login",login);
userRouter.get("/users",isAuthenticate,getUsers);

userRouter.post("/cart",isAuthenticate,cart);

userRouter.post("/buyCart",isAuthenticate,buyCart);


// userRouter.post('/cart/:pid',isAuthenticate,addCart);
// userRouter.post('/products/:id',isAuthenticate,getCartProducts);
// userRouter.post('/cartLength',isAuthenticate,cartLength);
// userRouter.post('/wishlist',isAuthenticate,addWishlist);
// userRouter.post('/wishlistproducts',isAuthenticate,getWishlist);

module.exports = userRouter;
