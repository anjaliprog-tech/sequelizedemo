const jwt = require('jsonwebtoken');
const { UnAuthorized } = require("../services/error");
const logger = require('../loggers/logger')

module.exports = { 
    // Middeware for Generating a new JWT Token
    generateToken : async(data) => {
        let token = await jwt.sign(data, process.env.SECRET_KEY, {
            expiresIn: process.env.TOKEN_EXPIRY,
        });
    return token;
  },

  authenticate : async (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
    if (token) {
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length); // Remove Bearer from string 
      }
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          logger.error(err);
          next(new UnAuthorized("auth token is invalid"));
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      next(new UnAuthorized("auth token not supplied"));
    }
  }
}