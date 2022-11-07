const Joi = require("joi")
const { objectId } = require("@feathers-plus/validate-joi-mongodb")

const schema = Joi.object({
    householdId: objectId().required(),
    expensetypeId: objectId().required(),
    paymentDetails: Joi.object({
        amount: Joi.number().required(),
        date: Joi.date().required(),
        method: Joi.string().required(),
    }),
    description: Joi.string().min(3).max(500).required(),
    paidThrough: Joi.string().min(3).max(50).required(),
    paidBy: Joi.string().min(3).max(50).required(),
})

module.exports = schema

