const Joi = require("joi");


const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    message: Joi.string().min(5).max(2000).required(),
    emailid: Joi.string().min(3).max(255).required().email(),
    phone: Joi.string().min(7).max(10).required(),

})
module.exports = schema