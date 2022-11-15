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

const {
  addVerification,
  removeVerification
} = require("feathers-authentication-management");

const {
  disallow,
  iff,
  isProvider,
  preventChanges,
} = require("feathers-hooks-common");


const authNotifier = require("../auth-management/notifier");

const sendVerify = () =>
{
  return async (context) =>
  {
    const notifier = authNotifier(context.app);

    const users = Array.isArray(context.result)
      ? context.result
      : [context.result];

    await Promise.all(
      users.map(async user => notifier("resendVerifySignup", user))
    )
  };
}



module.exports = {
  before: {
    all: [],
    find: [fetchUsersBySearch()],
    get: [],
    create: [validate.form(schema, { abortEarly: false }), hashPassword('password'), handleFileUpload(), addVerification("auth-management")],
    // update: [authenticate('jwt'), validate.form(schema, { abortEarly: false }), hashPassword('password')],
    update: [disallow("external"), authenticate('jwt'), hashPassword('password')],
    // patch: [authenticate('jwt'), admin(), fetchAdminId()],
    patch: [
      authenticate("jwt"),
      iff(
        isProvider("external"),
        preventChanges(
          true,
          "email",
          "isVerified",
          "verifyToken",
          "verifyShortToken",
          "verifyExpires",
          "verifyChanges",
          "resetToken",
          "resetShortToken",
          "resetExpires"
        ),
        hashPassword("password")
      ),
    ],
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
   
    create: [
      sendVerify(),
      registerSuccessEmail(),
      removeVerification(),
      protect("password"),
    ],
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
