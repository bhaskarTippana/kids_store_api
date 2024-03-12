const products = require('../model/allProducts');
const getByCategory = async(req,res)=>{
    try{
        const {category} = req.params;
        const productCategories = await products.find({category:category});
        res.status(200).json(productCategories); 
    }catch(err){
        res.status(500).json({err});
    }
}

module.exports = getByCategory;