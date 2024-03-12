const products = require('../model/allProducts');
const getProductsById = async(req,res)=>{
        try {
            const productId  = await products.findById(req.params.id);
            res.status(200).json(productId);
        } catch (error) {
            res.status(500).json({error});
        }
}

module.exports = getProductsById;



















