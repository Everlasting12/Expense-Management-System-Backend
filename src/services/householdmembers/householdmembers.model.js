const Joi = require("joi")
const { objectId } = require("@feathers-plus/validate-joi-mongodb")

const schema = Joi.object({
    household: objectId().required(),
    user: objectId().required()
})

module.exports = schema;