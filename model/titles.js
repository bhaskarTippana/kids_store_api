const mongoose = require('mongoose');
 const titles = mongoose.Schema({
   title:String,
   title_url:String
 });

 module.exports = mongoose.model("titles",titles);