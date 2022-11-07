const { authenticate } = require('@feathersjs/authentication').hooks;

const schema = require("./expensetypes.model");
const validate = require("feathers-validate-joi");
const admin = require("../../hooks/admin");
const fetchExpensesBySearch = require('./hooks/fetchExpensesBySearch');
// searchText  fetchExpensesBySearch()
module.exports = {
  before: {
    all: [],
    find: [fetchExpensesBySearch()],
    get: [],
    create: [authenticate('jwt'), validate.form(schema, { abortEarly: false })],
    update: [authenticate('jwt'), validate.form(schema, { abortEarly: false })],
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
