const Cart = require("../model/cart.js");

const addWishlist = async (req, res) => {
  try {
    // Assuming req.body contains the data to be added to the wishlist

    // Retrieve the cart data from the database
    const cartData = await Cart.findOne({ user_id: req.body.user_id });
    const id = req.body.user_id;
    const productId = req.body.pid;
    // Perform any necessary operations with the cart data

    switch (req.body.type) {
      case "add":
        if (!cartData.wishlist.includes(productId)) {
          cartData.wishlist.push(productId);
        } else {
          console.log(`pid ${productId} already exists in cart`);
        }

        break;
        case "del":
           data=cartData.wishlist.filter((itemId)=>itemId !==productId);
           cartData.wishlist=data;
            break;
      default:
        break;
    }

    // cartData.wishlist.push(productId);

    await Cart.updateOne(
      { user_id: id },
      { $set: { wishlist: cartData.wishlist } }
    );

    // Send a response back to the client
    // res.status(200).json({ data: cartData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Id exists" });
  }
};

module.exports = addWishlist;
