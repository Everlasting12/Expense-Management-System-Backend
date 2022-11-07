// Initializes the `users` service on path `/users`
const { Users } = require('./users.class');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const customHooks = require('./fp.hooks');


const multer = require("multer");
const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })
const multipartMiddleware = multer();

module.exports = function (app)
{
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),

    //added custom by sid
    // fileServer: app.get("fileServer"),
    // filePath: app.get("filePath"),
    // imageMaxWidth: app.get("imageMaxWidth"), // for image upload only
    // imageMinWidth: app.get("imageMinWidth"), // for image upload only
  };


  // Initialize our service with any options it requires
  app.use('/users', multipartMiddleware.single("avatar"), function (req, res, next)
  {
    
    req.feathers.file = req.file;
    next();
  }, new Users(options, app));

  //custom created service by Sidhesh Parab
  app.use('/forgetpassword', new Users(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  //custom created service by Sidhesh Parab
  const forgetpassword = app.service('forgetpassword');

  service.hooks(hooks);
  forgetpassword.hooks(customHooks);

};
