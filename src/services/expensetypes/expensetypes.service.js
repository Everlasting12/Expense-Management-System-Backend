// Initializes the `expensetypes` service on path `/api/expensetypes`
const { Expensetypes } = require('./expensetypes.class');
const createModel = require('../../models/expensetypes.model');
const hooks = require('./expensetypes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/expensetypes', new Expensetypes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/expensetypes');

  service.hooks(hooks);
};
