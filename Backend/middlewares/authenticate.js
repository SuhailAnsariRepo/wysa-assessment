const jwt = require("jsonwebtoken");
require("dotenv").config()
const User = require('../models/userModel');

const authenticate = async (req, res, next) => {
    const token = req.headers.token;

    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (decoded) {
          // console.log(decoded);
          req.body.userID = decoded.userID;
          next();
        } else {
          res.status(403).send({ message: "User Authorization Error" });
        }
      });
    }else{
      res.status(403).send({ message: "Invalid Token" });
    }
};


module.exports = { authenticate };
