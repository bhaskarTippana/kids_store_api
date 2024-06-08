const users = require('../model/userRegister');
const getId = require('./login');
const getUsers = async(req,res)=>{
    try{
         if(req.user){
           let response = await users.findOne({'_id':req.user.userId});
           res
             .status(200)
             .json(response);
         }else{
            res.status(400).json({message:"token Invalid"})
         }
    }catch(err){
        res.status(500).json({err});
    }
}
module.exports = getUsers;