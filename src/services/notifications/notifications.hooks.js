const isRegistered = require("./hooks/isRegistered");
const validate = require('feathers-validate-joi');
const schema = require("./notifications.model");
const sendEmailConfirmation = require("./hooks/sendEmailConfirmation");
const verifyEmail = require("./hooks/verifyEmail");

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validate.form(schema, { abortEarly: false }), isRegistered(), verifyEmail()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [sendEmailConfirmation()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
