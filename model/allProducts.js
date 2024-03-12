const mongoose = require('mongoose');

const allProducts = mongoose.Schema({ 
        name: String,
        price:String ,
        description: String,
        url:String,
        rating: Number,
        review: [],
        discount: Number,
        category: String
})
const products = mongoose.model("products",allProducts);
module.exports = products;