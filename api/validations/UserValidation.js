const Joi = require('joi');


module.exports = {
    Add: Joi.object().keys({
        name: Joi.string().required().messages({
          'string.base'  : `name should be a type of 'text'`,
          'string.empty' : `name canot be an empty field`,
        }),
        email: Joi.string().required().empty().email().messages({
          'string.base'  : `email should be a type of 'text'`,
          'string.empty' : `email cannot be an empty field`,
          'string.email' : `email format not valid`,
          'any.required' : `email is a required field`,
        }),
        password: Joi.string().required().empty().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).max(16).messages({
          'string.base'         : `password should be a type of 'text'`,
          'string.empty'        : `password cannot be an empty field`,
          'string.min'          : 'password should be of minimum 6 characters',
          'string.max'          : 'password should be of maximum 16 characters',
          'string.pattern.base' : 'password must contains lower case, upper case and between 6 and 16 characters',
          'any.required'        : `password is a required field`,
        }),
        role: Joi.string().required().messages({
          'string.base'  : `role should be a type of 'text'`,
          'string.empty' : `role canot be an empty field`,
        }),
        phone           : Joi.number(),
        birth_of_date   : Joi.string().messages({
          'date.format' : 'birth_of_date should be YYYY-MM-DD format',
          'any.required': 'birth_of_date is required field'  
        }), 
        image           : Joi.optional(),
        location        : Joi.string(),
      }),
      
      Edit: Joi.object().keys({
        id: Joi.string().required().empty().messages({
          "string.base": `id should be a type of 'text'`,
          "string.empty": `id cannot be an empty field`,
          "any.required": `id is a required field`,
        }),
        name: Joi.string().required().messages({
          'string.base'  : `name should be a type of 'text'`,
          'string.empty' : `name canot be an empty field`,
        }),
        email: Joi.string().required().empty().email().messages({
          'string.base'  : `email should be a type of 'text'`,
          'string.empty' : `email cannot be an empty field`,
          'string.email' : `email format not valid`,
          'any.required' : `email is a required field`,
        }),
        password: Joi.string().required().empty().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).max(16).messages({
          'string.base'         : `password should be a type of 'text'`,
          'string.empty'        : `password cannot be an empty field`,
          'string.min'          : 'password should be of minimum 6 characters',
          'string.max'          : 'password should be of maximum 16 characters',
          'string.pattern.base' : 'password must contains lower case, upper case and between 6 and 16 characters',
          'any.required'        : `password is a required field`,
        }),
        role: Joi.string().required().messages({
          'string.base'  : `role should be a type of 'text'`,
          'string.empty' : `role canot be an empty field`,
        }),
        phone           : Joi.number(),
        birth_of_date   : Joi.string().messages({
          'date.format' : 'birth_of_date should be YYYY-MM-DD format',
          'any.required': 'birth_of_date is required field'  
        }), 
        image           : Joi.optional(),
        location        : Joi.string(),
      }),


      login :Joi.object().keys({
        email: Joi.string().required().empty().email().messages({
          'string.base'  : `email should be a type of 'text'`,
          'string.empty' : `email cannot be an empty field`,
          'string.email' : `email format not valid`,
          'any.required' : `email is a required field`,
        }),
        password: Joi.string().required().empty().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).max(16).messages({
          'string.base'         : `password should be a type of 'text'`,
          'string.empty'        : `password cannot be an empty field`,
          'string.min'          : 'password should be of minimum 6 characters',
          'string.max'          : 'password should be of maximum 16 characters',
          'string.pattern.base' : 'password must contains lower case, upper case and between 6 and 16 characters',
          'any.required'        : `password is a required field`,
        }),
    })
}