const express = require("express");
const userRouter = express.Router();
const register = require("../controllers/register.js");
const login = require("../controllers/login.js");
const getUsers = require("../controllers/getUser.js");
const cart = require("../controllers/cart.js");
const buyCart = require("../controllers/buyCart.js");
const addCart = require("../controllers/quantityManagement.js");
const getCartProducts = require("../controllers/getCartProducts.js");
const cartLength = require("../controllers/CartLength.js");
const quantityManagement = require("../controllers/quantityManagement.js");
const getWishlist = require("../controllers/getWishlist.js");
const isAuthenticate = require("../controllers/authController.js");
const stripe = require ("stripe") (process.env.STRIPE_SECRET_KEY);

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/users", isAuthenticate, getUsers);

userRouter.post("/cart", isAuthenticate, cart);

userRouter.post("/buyCart", isAuthenticate, buyCart);

userRouter.post("/quantityManagement", isAuthenticate, quantityManagement);

userRouter.post("/checkout-session", async (req, res) => {
    try {
      const { products} = req.body;
      

      console.log(products,'prooooooo')
      
      const lineItems = products.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.url]  // 'images' should be used instead of 'image'
          },
          unit_amount: parseInt(product.price.replace('$', '')) * 100,
        },
        quantity: product.quantity || 1,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:5173/payment-success",
        cancel_url: "http://localhost:5173/payment-cancel"
      });
  
      res.json({ id: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });


module.exports = userRouter;
