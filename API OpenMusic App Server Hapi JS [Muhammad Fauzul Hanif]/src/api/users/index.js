const { UserHandlers } = require('./handlers')
const { UserRoutes } = require('./routes')

exports.Users = {
  name: 'users',
  version: '1.0.0',
  register: async (server, { userServices, validators }) => {
    server.route(UserRoutes(UserHandlers({ userServices, validators })))
  },
}
