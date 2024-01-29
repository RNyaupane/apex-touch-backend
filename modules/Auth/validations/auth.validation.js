const Joi = require('joi');
const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/);

const validatePassword = (value) => {  
    if(!passwordRegex.test(String(value))) { 
        throw new Error('Password should contains a lowercase, a uppercase character and a digit.')
    }
}

module.exports = {
    register: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(16).required().external(validatePassword)
    }),
    login: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    changePassword: Joi.object().keys({
        password: Joi.string().required(),
        new_password: Joi.string().min(8).max(16).required().external(validatePassword)
    }),
    resetPassword: Joi.object().keys({
        password: Joi.string().min(8).max(16).required().external(validatePassword),
        password_confirmation: Joi.any().equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .options({ messages: { 'any.only': '{{#label}} does not match'} })
    })
}