const express = require("express");
const userRouter = express.Router();
const register = require("../controllers/register.js");
const login = require("../controllers/login.js");
const getUsers = require("../controllers/getUser.js");
const cart = require("../controllers/cart.js");
const buyCart = require("../controllers/buyCart.js");
const isAuthenticate = require("../controllers/authController.js");
const postAddress = require("../controllers/address.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/users", isAuthenticate, getUsers);

userRouter.post("/cart", isAuthenticate, cart);

userRouter.post("/buyCart", isAuthenticate, buyCart);


userRouter.post("/address", isAuthenticate, postAddress);

userRouter.post("/checkout-session", async (req, res) => {
  try {
    const { products } = req.body;

    const lineItems = products.map((product) => {
      const price = parseInt(
        product.price.replace("$", "") -
          (product.price.replace("$", "") * product.discount) / 100
      );
      const gst = price * 0.18;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.url],
          },
          unit_amount: Math.round((price + gst) * 100),
        },
        quantity: product.quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "https://kidsgarage.netlify.app/payment-success",
      cancel_url: "https://kidsgarage.netlify.app/payment-cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = userRouter;
