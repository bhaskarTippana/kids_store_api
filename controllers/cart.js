const users = require("../model/userRegister");
const getCart = async (req, res) => {
  try {
    let action = req.body.action;
    let product = req.body.product;
    let userId = req.user.userId;
    let foundUser = await users.findOne({ _id: userId });
    switch (action) {
      case "ADD_CART":
        let existProduct = foundUser.cart.filter(e=>{
          return e._id === product._id
        })
        
        foundUser.cart.push(product);
        await foundUser.save();
        return res.status(200).json({ cart : foundUser.cart });
      // return res.status(200).json({cart:foundUser.cart});
      // if (user.cart.length === 0) {
      //   user.cart.push(product);
      //   await user.save();
      //   return res.send(user.cart);
      // } else {
      //   let userCart = user.cart.filter((e)=>{
      //     return e._id === product._id
      //   })
      //   if(userCart.length > 0){
      //     return res.send({msg:"already there"})
      //   }else{
      //     user.cart.push(product);
      //     await user.save();
      //     return res.send(user.cart)
      //   }
      // }

      case "DEL_CART":
        let arr1 = userCart.filter((e) => {
          return e._id !== product._id;
        });
        user.cart = arr1;
        await user.save();
        return res.send(user.Cart);

      // case "ADD_WISHLIST":
      //   let arr2 = userWishlist.filter((e) => {
      //     return e._id === product._id;
      //   });
      //   if (arr2.length === 0) {
      //     userWishlist.push(product);
      //     await user.save();
      //     return res.send(userWishlist);
      //   } else {
      //     return res.send({ message: "already there" });
      //   }
      // case "DEL_WISHLIST":
      //   let arr3 = userWishlist.filter((e) => {
      //     return e._id !== product._id;
      //   });
      //   user.wishlist = arr3;
      //   await user.save();
      //   return res.send(user.wishlist);

      default:
        return res.status(200).json({ cart: userCart, wishlist: userWishlist });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

module.exports = getCart;
