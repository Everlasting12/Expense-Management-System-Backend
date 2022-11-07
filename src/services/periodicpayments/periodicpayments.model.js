const { objectId } = require("@feathers-plus/validate-joi-mongodb");
const Joi = require("joi");

const schema = Joi.object({
    householdId: objectId().required(),
    frequency: Joi.string().required(),
    amount: Joi.number().required(),
    dueDate: Joi.date().required(),
    expensetypeId: objectId().required(),
    paymentDetails: Joi.array().items(
        Joi.object({
            amount: Joi.number(),
            date: Joi.date(),
            method: Joi.string(),
        }),
    ),
    description: Joi.string().required(),
    paidThrough: Joi.string(),
    paidBy: Joi.array().items(Joi.string()),
})

module.exports = schema;