const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();
const secretKey = process.env.SECRET_KEY;

 function isAuthenticate(req, res, next) {
  let token = req.headers['token'];
  if (token) {
    jwt.verify(token, secretKey, (err, decode) => {
      if (err) {
        res
          .status(401)
          .send({ auth: false, message: "Invalid token" });
      } else {
        req.user = decode;
        // console.log("user-verified !")
        next();
      }
    });
  } else {
    res.status(401).send({ auth: false, message: "No Token Provided" });
  }
}

module.exports = isAuthenticate;