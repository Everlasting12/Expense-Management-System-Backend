const users = require('./users/users.service.js');
const households = require('./households/households.service.js');
const householdmembers = require('./householdmembers/householdmembers.service.js');
const expensetypes = require('./expensetypes/expensetypes.service.js');
const householdexpenses = require('./householdexpenses/householdexpenses.service.js');
const periodicpayments = require('./periodicpayments/periodicpayments.service.js');
const notifications = require('./notifications/notifications.service.js');
// eslint-disable-next-line no-unused-vars

// const authManagement = require("./auth-management/auth-management.service.js");


module.exports = function (app)
{
  app.configure(users);
  app.configure(households);
  app.configure(householdmembers);
  app.configure(expensetypes);
  app.configure(householdexpenses);
  app.configure(periodicpayments);


  // app.configure(authManagement);


  app.configure(notifications);
};

