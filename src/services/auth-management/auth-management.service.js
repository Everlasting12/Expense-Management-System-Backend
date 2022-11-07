// services/auth-management/auth-management.service.js
const {
    AuthenticationManagementService,
} = require("feathers-authentication-management");

const notifier = require("./notifier");

module.exports = function (app)
{
    app.use(
        "/auth-management",
        new AuthenticationManagementService(app, {
            notifier: notifier(app),
        })
    );
};
