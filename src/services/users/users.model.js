const Joi = require("joi");
const { objectId } = require("@feathers-plus/validate-joi-mongodb")


const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    phone: Joi.string().min(7).max(10).required(),
    userName: Joi.string().min(5).max(100).required(),
    password: Joi.string().min(5).max(1024).required(),
    role: Joi.string().required(),
    updatedBy: objectId(),
    resetLink: Joi.string()
})
module.exports = schema