const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user_id:{type:String,require:true},
    cart:[],
    wishlist:[]
});

module.exports = mongoose.model("cartSchema", cartSchema);