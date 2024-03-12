const products = require('../model/allProducts.js');

const getAllProducts = async(req,res)=>{
    try{
        let response = await products.find({});
         res.status(200).json(response);
    }catch(err){
        res.status(500).json({err});
    }
}
module.exports = getAllProducts;