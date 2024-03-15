const users = require("../model/userRegister");
const getCart = async (req, res) => {
  try {
    let action = req.body.action;
    let product = req.body.product;
    let userId = req.user.userId;
    let foundUser = await users.findOne({ _id: userId });
    switch (action) {
      case "ADD_CART":
        if (foundUser.cart.length === 0) {
          foundUser.cart.push(product);
          await foundUser.save();
          return res.status(200).json(foundUser);
        } else {
          for (let i of foundUser.cart) {
            if (i._id === product._id) {
              return res
                .status(400)
                .json({ message: "Product already in cart" });
            }
          }
          foundUser.cart.push(product);
          await foundUser.save();
          return res.status(200).json(foundUser);
        }
      case "DELETE_CART":
        foundUser.cart = foundUser.cart.filter(
          (item) => item._id !== product._id
        );
        await foundUser.save();
        return res.status(200).json(foundUser);
      case "ADD_WISHLIST":
        if (foundUser.wishlist.length === 0) {
          foundUser.wishlist.push(product);
          await foundUser.save();
          return res.status(200).json(foundUser);
        } else {
          for (let i of foundUser.wishlist) {
            if (i._id === product._id) {
              return res
                .status(400)
                .json({ message: "Product already in wishlist" });
            }
          }
          foundUser.wishlist.push(product);
          await foundUser.save();
          return res.status(200).json(foundUser);
        }
      case "DELETE_WISHLIST":
        foundUser.wishlist = foundUser.wishlist.filter(
          (item) => item._id !== product._id
        );
        await foundUser.save();
        return res.status(200).json(foundUser);
      default:
        return res.status(200).json(foundUser);
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

module.exports = getCart;
