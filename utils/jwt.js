const jwt = require("jsonwebtoken");
const createToken = (userId) => {
  const secret = process.env.SECRET_KEY;
  return jwt.sign({userId},secret,{expiresIn : '30min'});
};

module.exports = createToken;
