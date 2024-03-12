const cart = require('../model/cart');

const cartLength = async (req,res)=>{
  let userId = req.user.userId;
try {

  if (userId) {
    let response = await cart.findOne({user_id:userId});
  res.status(200).json(response);

  }
} catch (err) {
  res.status(500).json({ err });
}
}

module.exports = cartLength;