const mongoose = require('mongoose');
 const categories = mongoose.Schema({
    categoryName:String,
    back_url:String,
    front_url:String
 });

 module.exports = mongoose.model("categories",categories);