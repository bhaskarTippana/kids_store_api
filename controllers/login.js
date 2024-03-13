const User = require("../model/userRegister.js");
const bcrypt = require("bcrypt");
const createToken = require("../utils/jwt.js");

const loginUser = async (req, res) => {
  try {
    const {firstName, email, password } = req.body;
    const user = await User.findOne( {$or:[{firstName},{email}]});
    if (!user) {
      return res.status(401).json({ message: "Invalid username or Email" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid  password" });
    }
    const token = createToken(user._id);
    res.status(200).json({ token,exp:"7d" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = loginUser;
