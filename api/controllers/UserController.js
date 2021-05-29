const db = require("../models/sequelize");
const User = db.details;
const bcrypt = require('bcrypt');
const { GeneralResponse } = require('../services/response');
const { GeneralError, NotFound } = require('../services/error');
const logger = require('../loggers/logger');
const config = require("../services/config");
const { upload } = require("../services/multer");
module.exports = {
  add: async (req, res, next) => {
    // logger.info("request", req)
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      next(
        new GeneralResponse(
          "user with email address is already exists",
          config.HTTP_BAD_REQUEST
        )
      );
    }
    else {
      upload(req, res, (err) => {
        if (err) {
          logger.error("err", err)
        }
        const user = {
          name: req.body.name,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 10),
          role: req.body.role,
          phone: req.body.phone,
          birth_of_date: req.body.birth_of_date,
          image: req.file.originalname,
          location: req.body.location
        };
        const userCreated = await User.create(user);
        if (userCreated) {
          next(
            new GeneralResponse(
              "user added details successfully",
              userCreated,
              config.HTTP_CREATED
            )
          );
        }
        else {
          next(new GeneralError("user details added failed"));
        }
      });
    }
  },

  find: async (req, res, next) => {
    try {
      const users = await User.findAll();
      if (users) {
        next(new GeneralResponse('user detail found', users))
      }
      else {
        next(new NotFound('user not found'));
      }
    }
    catch (err) {
      next(new GeneralError('error while getting user detail'))
    }
  },

  findById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await User.findByPk(id);
      if (result) {
        next(new GeneralResponse('user detail found', result))
      }
      else {
        next(new NotFound('user not found'));
      }
    }
    catch (err) {
      next(new GeneralError('error while getting user detail'))
    }
  },

  edit: async (req, res, next) => {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        phone: req.body.phone,
        birth_of_date: req.body.birth_of_date,
        image: req.body.image,
        location: req.body.location
      };
      const updateddata = await User.update(user,
        {
          where: { id: req.params.id }
        }
      );
      if (updateddata) {
        next(
          new GeneralResponse(
            "User updated details successfully",
            updateddata,
            config.HTTP_CREATED
          )
        );
      }
      else {
        next(new GeneralError("user details updation failed"));
      }
    }
    catch (err) {
      next(new GeneralError("user details updation failed"));
    }
  },

  delete: async (req, res, next) => {
    try {
      const data = await User.destroy({ where: { id: req.params.id }});
      if (data) {
        next(new GeneralResponse('"User was deleted successfully!"'))
      }
      else {
        next(new NotFound('user not found'));
      }
    }
    catch (err) {
      next(new GeneralError('error while deleting user detail'))
    }
  },
}