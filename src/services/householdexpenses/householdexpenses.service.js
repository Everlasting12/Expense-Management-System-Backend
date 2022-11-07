// Initializes the `householdexpenses` service on path `/api/householdexpenses`
const { Householdexpenses } = require('./householdexpenses.class');
const createModel = require('../../models/householdexpenses.model');
const hooks = require('./householdexpenses.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/householdexpenses', new Householdexpenses(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/householdexpenses');

  service.hooks(hooks);
};
