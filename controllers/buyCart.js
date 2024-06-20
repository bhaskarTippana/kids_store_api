const users = require("../model/userRegister");

const buyProductsCart = async (req, res) => {
  try {
    const { action, product } = req.body;
    const userId = req.user.userId;


    // Find the user by userId
    const foundUser = await users.findOne({ _id: userId });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

  

    switch (action) {
      case "SINGLE_PRODUCT_ADD":
        foundUser.buyCart.push(product);
        foundUser.buyProductsCart = [];
        await foundUser.save();
        return res.status(200).json(foundUser);
      case "SINGLE_PRODUCT_REMOVE":
        foundUser.buyCart.pop(product);
        await foundUser.save();
        return res.status(200).json(foundUser);
      case "EMPTY_CART":
        foundUser.buyCart = [];
        await foundUser.save();
        return res.status(200).json(foundUser);
      case "MULTI_PRODUCTS":
        foundUser.cart.forEach((item) => {
          const occurrences =
            foundUser.buyCart.filter(
              (buyItem) => String(buyItem._id) === String(item._id)
            ).length + 1;
          foundUser.buyProductsCart.push({ ...item, occurrences });
        });
        await foundUser.save();
        return res.status(200).json(foundUser);

      default:
        return res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = buyProductsCart;


