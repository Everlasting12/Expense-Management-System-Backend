const fetchUsersBySearch = require('./hooks/fetchUsersBySearch');
const processResetPassword = require('./hooks/processResetPassword');
const sendResetPasswordSuccessEmail = require('./hooks/sendResetPasswordSuccessEmail');
const sendResetPasswordTokenEmail = require('./hooks/sendResetPasswordTokenEmail');

const {
    hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
    before: {
        all: [],
        find: [fetchUsersBySearch()],
        get: [],
        create: [],
        update: [sendResetPasswordTokenEmail()],
        patch: [processResetPassword(), hashPassword('password')],
        remove: [],
    },
    after: {
        all: [protect('password')],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [sendResetPasswordSuccessEmail()],
        remove: [],
    },
    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    }
}