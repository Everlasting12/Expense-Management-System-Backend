const Joi = require("joi");

// const { objectId } = require("@feathers-plus/validate-joi-mongodb")


const schema = Joi.object({

    name: Joi.string().min(3).max(50).required(),
    addressLine1: Joi.string().min(5).max(40).required(),
    addressLine2: Joi.string().min(5).max(40).required(),
    area: Joi.string().min(3).max(30).required(),
    city: Joi.string().min(3).max(30).required(),
    state: Joi.string().min(3).max(40).required(),
    zipcode: Joi.string().min(6).max(6).required(),

})
module.exports = schema

