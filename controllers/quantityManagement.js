const cart = require("../model/cart.js");

const quantityManagement = async (req,res)=>{
    try {
        console.log(req.body);
        res.send(cart);
    } catch (error) {
      
    }
}

module.exports = quantityManagement;

