const { AuthenticationHandlers } = require('./handlers')
const { AuthenticationRoutes } = require('./routes')

exports.Authentications = {
  name: 'authentications',
  version: '1.0.0',
  register: async (
    server,
    { validators, tokenManager, userServices, authenticationServices },
  ) => {
    server.route(
      AuthenticationRoutes(
        AuthenticationHandlers({
          validators,
          tokenManager,
          userServices,
          authenticationServices,
        }),
      ),
    )
  },
}
