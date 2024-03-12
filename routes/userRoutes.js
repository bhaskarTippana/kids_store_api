const express = require("express");
const userRouter = express.Router();
const postUser = require("../controllers/postUsers.js");
const checkUser = require("../controllers/userLogin.js");
const getUsers = require("../controllers/getUser.js")
const getCart = require("../controllers/getCart.js");
const addCart = require("../controllers/addCart.js");
const getCartProducts = require("../controllers/getCartProducts.js");
const cartLength = require("../controllers/CartLength.js");
const addWishlist = require("../controllers/addWishlist.js");
const getWishlist = require("../controllers/getWishlist.js");
const isAuthenticate = require('../controllers/authController.js');





userRouter.post("/register", postUser);
userRouter.post("/login",checkUser);
userRouter.get("/users",isAuthenticate,getUsers);



userRouter.get('/isAuthenticate',isAuthenticate,(req,res)=>{
    if(req.user){
        res.status(200).json({isLogin:true})
    }
    else{
        res.status(400).json({isLogin:false})
    }
})

userRouter.post("/cart",isAuthenticate,getCart);




// userRouter.post('/cart/:pid',isAuthenticate,addCart);
// userRouter.post('/products/:id',isAuthenticate,getCartProducts);
// userRouter.post('/cartLength',isAuthenticate,cartLength);
// userRouter.post('/wishlist',isAuthenticate,addWishlist);
// userRouter.post('/wishlistproducts',isAuthenticate,getWishlist);

module.exports = userRouter;
