// Initializes the `householdmembers` service on path `/api/householdmembers`
const { Householdmembers } = require('./householdmembers.class');
const createModel = require('../../models/householdmembers.model');
const hooks = require('./householdmembers.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/householdmembers', new Householdmembers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/householdmembers');

  service.hooks(hooks);
};
