const jwt = require("jsonwebtoken");
const createToken = (userId) => {
  const secret = process.env.SECRET_KEY;
  return jwt.sign({userId},secret,{expiresIn : '7d'});
};

module.exports = createToken;
