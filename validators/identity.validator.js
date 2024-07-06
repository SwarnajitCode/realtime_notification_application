const Joi = require('joi');

const registerUserSchema = Joi.object({
    userName: Joi.string().required(),
    userPassword: Joi.string().min(6).max(10).required()
})
const loginSchema = Joi.object({
    userName: Joi.string().required(),
    userPassword: Joi.string().required(),
})
module.exports = {
    registerUserSchema , loginSchema
};