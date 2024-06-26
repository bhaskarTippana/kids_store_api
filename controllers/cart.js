const users = require("../model/userRegister");
const { v4: uuidv4 } = require("uuid");
const getCart = async (req, res) => {
  try {
    let action = req.body.action;
    let product = req.body.product;
    let userId = req.user.userId;
    
    let foundUser = await users.findOne({ _id: userId });
  
    switch (action) {
      case "ADD_CART":
        let cartProduct = foundUser.cart.find(
          (item) => item._id === product._id
        );
        if (cartProduct) {
          cartProduct.quantity = (cartProduct.quantity || 1) + 1;
        } else {
          foundUser.cart.push({ ...product, quantity: 1 });
        }
        await foundUser.save();
        return res.status(200).json(foundUser);

      case "DELETE_CART":
        foundUser.cart = foundUser.cart.filter(
          (item) => item._id !== product._id
        );
        await foundUser.save();
        return res.status(200).json(foundUser);

      case "INCREMENT_QUANTITY":
        const itemToUpdate = foundUser.cart.find(
          (item) => item._id === product._id
        );
        if (itemToUpdate) {
          const updatedCart = foundUser.cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          foundUser.cart = updatedCart;
          await foundUser.save();

          return res.status(200).json(foundUser);
        } else {
          return res.status(404).json({ message: "Item not found in cart" });
        }

      case "DECREMENT_QUANTITY":
        const itemToDecrement = foundUser.cart.find(
          (item) => item._id === product._id
        );
        if (itemToDecrement) {
          if (itemToDecrement.quantity > 1) {
            const updatedCart = foundUser.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
            foundUser.cart = updatedCart;
          } else {
            foundUser.cart = foundUser.cart.filter(
              (item) => item._id !== product._id
            );
          }
          await foundUser.save();

          return res.status(200).json(foundUser);
        } else {
          return res.status(404).json({ message: "Item not found in cart" });
        }

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

      case "MY_ORDER_LIST":
       

        const orderWithUniqueId = {
          id: uuidv4(),
          items: product,
        };

        foundUser.buyCart = [];
        foundUser.buyProductsCart = [];
        foundUser.myOrders = [...foundUser.myOrders, orderWithUniqueId];

        await foundUser.save();
        return res.status(200).json(foundUser);

      case "EMPTY_BUYCART":
        foundUser.buyCart = [];
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
