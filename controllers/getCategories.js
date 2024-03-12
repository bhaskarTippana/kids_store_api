const categories = require('../model/categories.js');
const getAllCategories = async(req,res)=>{
    try{
        let response = await categories.find({});
         res.status(200).json(response);
    }catch(err){
        res.status(500).json({err});
    }
}
module.exports = getAllCategories;