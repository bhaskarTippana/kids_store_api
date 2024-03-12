const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();
const secretKey = process.env.SECRET_KEY;

 function isAuthenticate(req, res, next) {
  console.log(req.headers);
  let token = req.headers['token'];
  console.log(token);
  if (token) {
    jwt.verify(token, secretKey, (err, decode) => {
      if (err) {
        res
          .status(401)
          .send({ auth: false, message: "Invalid token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ auth: false, message: "No Token Provided" });
  }
}

module.exports = isAuthenticate;