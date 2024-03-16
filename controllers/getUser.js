const users = require('../model/userRegister');
const getId = require('./login');
const getUsers = async(req,res)=>{
    try{
        // let response = await users.find({});
        //  res.status(200).json(response);
         if(req.user){
           console.log(req.user,"777777");
           let response = await users.findOne({'_id':req.user.userId});
           console.log(response, "uerrrrrrrrrrrrr");
           let {firstName,email,_id,cart,wishlist,buyCart} = response;
           res
             .status(200)
             .json({ firstName, email, _id, cart, wishlist, buyCart,buyProductsCart });
         }else{
            res.status(400).json({message:"token Invalid"})
         }
    }catch(err){
        res.status(500).json({err});
    }
}
module.exports = getUsers;