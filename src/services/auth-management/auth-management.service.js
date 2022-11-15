// services/auth-management/auth-management.service.js
const {
    AuthenticationManagementService,
} = require("feathers-authentication-management");

const notifier = require("./notifier");

module.exports = function (app)
{
    const options = {
        notifier: notifier(app),
        delay: 1 * 24 * 60 * 60 * 1000, // this is verifyExpiry delay
        //you can specify minutes / hourse or a day (in my case I specified the
        //   expiry of the token to be of a 24 hourse i.e.a day)
        
        resetDelay: 3 * 60 * 1000,
    };
    app.use(
        "/auth-management",
        new AuthenticationManagementService(app, options)
    );

};
