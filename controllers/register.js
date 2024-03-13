const User = require('../model/userRegister.js');
const bcrypt = require('bcrypt');
const cartSchema = require('../model/cart.js');

const userRegister = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({
            $or: [{ firstName }, { email }],
        });
        if (existingUser) {
            return res.status(400).json({ message: "UserName or Email Already Exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, password: hashPassword });
        await user.save();
        res.status(201).json({message:"register successfully !"});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
};

module.exports = userRegister;
