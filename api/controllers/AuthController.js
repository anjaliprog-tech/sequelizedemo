const bcrypt = require('bcrypt');
const db = require("../models/sequelize");
const User = db.details;
const { generateToken } = require("../helpers/auth");
const { GeneralResponse } = require('../services/response');
const { GeneralError } = require('../services/error');
const logger = require('../loggers/logger');
const config = require("../services/config");

module.exports = {
    login : async(req, res, next) => {
          try{
            logger.info("req.body", req.body)
              const {email, password} = req.body;
              const result = await User.findOne({ where: { email : email } });
              const originalPass = result.dataValues.password;
              const response = await bcrypt.compare(password, originalPass);
              
              if(response){
                   
                  const userData = {
                      email : result.dataValues.email,
                      id : result.dataValues.id
                  }
                  const token = await generateToken(userData);
                  next(
                    new GeneralResponse("user successfully login", {
                      token: token
                    }, config.HTTP_SUCCESS)
                  )
              }
          }
          catch(err)
          {
            next(new GeneralError("user login failure"));
          }  
    }
}