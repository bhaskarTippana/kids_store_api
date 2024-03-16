const users = require("../model/userRegister");

const buyProductsCart = async (req, res) => {
  try {
    let action = req.body.action;
    let userId = req.user.userId;
    console.log(userId, "userId");

    // Find the user by userId
    let foundUser = await users.findOne({ _id: userId });
    console.log(foundUser);
    switch (action) {
      case "MULTI_PRODUCTS":
        foundUser.cart.forEach((item) => {
          let occurrences =
            foundUser.buyCart.filter((buyItem) => buyItem._id === item._id)
              .length + 1;
          foundUser.buyProductsCart.push({ ...item, occurrences });
        });
        await foundUser.save(foundUser);
        return res.status(200).json(foundUser);
      default:
        return res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = buyProductsCart;
