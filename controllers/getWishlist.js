const products = require("../model/allProducts");
const Cart = require("../model/cart");

const getWishlist = async (req, res) => {
  try {
    const userId = req.body.id;
    const pid = req.body.pid; // Assuming id is directly available in req.body

    // Fetch user data (assuming user is stored in Cart model)
    const user = await Cart.findOne({ user_id: userId });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const productsArr = user.wishlist; // Assuming wishlist is stored in user's wishlist field
    const productObjArr = [];
    
    // Fetch product details for each product ID in the wishlist
    for (let i = 0; i < productsArr.length; i++) {
      let response = await products.findOne({ _id: productsArr[i] });
      if (response) {
        productObjArr.push(response);
      }
    }

    // Handle different types of requests
    switch (req.body.type) {
      case "del":
        // Remove item from wishlist
        const newArray = productsArr.filter((item) => item !== req.body.pid);
        user.wishlist = newArray;
        await user.save();
        return res.send(newArray);
      case "add":
        // Return wishlist items
        return res.send(productObjArr);
      default:
        return res.status(400).send("Invalid request");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = getWishlist;
