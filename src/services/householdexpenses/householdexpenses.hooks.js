
const { authenticate } = require('@feathersjs/authentication').hooks;
const schema = require('./householdexpenses.model');
const validate = require("feathers-validate-joi");
const fetchHousehold = require('./hooks/fetchHousehold');
const fetchExpenseType = require("./hooks/fetchExpensetype")
const admin =  require("../../hooks/admin")

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), validate.form(schema, { abortEarly: false }), fetchHousehold(), fetchExpenseType()],
    update: [authenticate('jwt'), validate.form(schema, { abortEarly: false }), fetchHousehold(), fetchExpenseType()],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt'), admin()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
