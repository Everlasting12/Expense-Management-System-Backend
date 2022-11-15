const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');


/*
module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
*/

module.exports = app =>
{
  class MyAuthService extends AuthenticationService
  {
    async getPayload(authResult, params)
    {
      const payload = await super.getPayload(authResult, params);
      const { user } = authResult;

      if (user)
      {
        payload["role"] = user.role;
        payload["isActive"] = user.isActive
      }
      return payload;
    }
  }


  const authentication = new MyAuthService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  app.use('/authentication',
    async (req, res, next) =>
    {

      const userService = await app.service("/users");
      const user = await userService.find({ query: { email: req.body.email } })
      if (user.data[0].isVerified === false)
      {
        return res.status(401).send({ message: "Please verify your account" })
      }
      next();
    },
    authentication);
  app.configure(expressOauth());
};
