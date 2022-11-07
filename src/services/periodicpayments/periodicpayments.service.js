// Initializes the `periodicpayments` service on path `/api/periodicpayments`
const { Periodicpayments } = require('./periodicpayments.class');
const createModel = require('../../models/periodicpayments.model');
const hooks = require('./periodicpayments.hooks');

module.exports = function (app)
{
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: ['patch']
  };

  // Initialize our service with any options it requires
  app.use('/api/periodicpayments', new Periodicpayments(options, app));


  // Get our initialized service so that we can register hooks
  const service = app.service('api/periodicpayments');
  
  service.hooks(hooks);
};
