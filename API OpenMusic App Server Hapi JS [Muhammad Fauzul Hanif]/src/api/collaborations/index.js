const { CollaborationHandlers } = require('./handlers')
const { CollaborationRoutes } = require('./routes')

exports.Collaborations = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (
    server,
    { validators, userServices, playlistServices, collaborationServices },
  ) => {
    server.route(
      CollaborationRoutes(
        CollaborationHandlers({
          validators,
          userServices,
          playlistServices,
          collaborationServices,
        }),
      ),
    )
  },
}
