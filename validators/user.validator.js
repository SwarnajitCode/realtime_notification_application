const Joi = require('joi');

const addFollowerSchema = Joi.object({
    followId: Joi.string().required(),
})

module.exports = {
    addFollowerSchema
};