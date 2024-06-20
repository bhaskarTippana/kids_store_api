const products = require("../model/allProducts");
const getCart = require("./cart");

const getCartProducts = async (req, res) => {
 
  try {
    const { id } = req.params;
    const user = await getCart(req, res);
   
    const productsArr = user.cart;
    const productObjArr = [];
    for (let i = 0; i < productsArr.length; i++) {
      let response = await products.findOne({ _id: productsArr[i] });
      productObjArr.push(response);
    }

    switch (req.body.type) {
      case "del":
        const newArray = productsArr.filter((item) => item !== req.body.id);
        user.cart = newArray;
        await user.save();

        return res.send(newArray);
      case "add":
        if (user.user_id === id) {
          return res.send(productObjArr);
        }
      default:
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = getCartProducts;
