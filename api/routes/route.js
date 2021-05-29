const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const userController = require("../controllers/UserController");
const userValidation = require('../validations/UserValidation');
const { validator } = require('../helpers/validator');
const { authenticate } = require('../helpers/auth');

// router.get('/', usersController);
router.post('/user', validator.body(userValidation.Add),  userController.add);
router.get('/user', authenticate,  userController.find);
router.get('/user/:id', authenticate, userController.findById);
router.put('/user/:id', authenticate, validator.body(userValidation.Edit), userController.edit);
router.delete('/user/:id',authenticate, userController.delete);

/***********************login******************************/
router.get('/login', validator.body(userValidation.login), AuthController.login);
module.exports = router;