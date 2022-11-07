const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;


const schema = require("./users.model");
const validate = require('feathers-validate-joi');
const admin = require("../../hooks/admin");
const fetchAdminId = require('./hooks/fetchAdminId');
const fetchUsersBySearch = require('./hooks/fetchUsersBySearch');
const registerSuccessEmail = require('./hooks/registerSuccessEmail');
const handleFileUpload = require('./hooks/handleFileUpload');
// sendVerificationEmail(), addVerification("auth-management")
module.exports = {
  before: {
    all: [],
    find: [fetchUsersBySearch()],
    get: [],
    create: [validate.form(schema, { abortEarly: false }), hashPassword('password'), handleFileUpload()],
    // update: [authenticate('jwt'), validate.form(schema, { abortEarly: false }), hashPassword('password')],
    update: [hashPassword('password')],
    patch: [authenticate('jwt'), admin(), fetchAdminId()],
    remove: [authenticate('jwt'), admin()]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [registerSuccessEmail()],
    // create: [

    //   protect("password"),
    //   sendVerify(),
    //   removeVerification()
    // ],
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
