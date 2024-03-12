const cart = require("../model/cart.js");

const addCart = async (req, res) => {
  let userId = req.user.userId;
  console.log(req.user);
console.log(userId,'userId');
  try {
    const { pid } = req.params;
    if (pid) {
      let cartData = await cart.findOne({ user_id: userId });
   // Check if pid already exists in cart
   console.log(cartData,'cartData');
   if (!cartData.cart.includes(pid)) {
    cartData.cart.push(pid);
  } else {
    console.log(`pid ${pid} already exists in cart`);
  }

  // console.log(cartData, 'cartData.cart after pushing pid');


      // Update multiple documents
     await cart.updateOne({ user_id: userId }, { $set: { cart: cartData.cart } });
      // console.log(result,'result');
      // console.log('---------------------------------------------');
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = addCart;


