const { AlbumHandlers } = require('./handlers')
const { AlbumRoutes } = require('./routes')

exports.Albums = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { validators, albumServices, songServices }) => {
    server.route(
      AlbumRoutes(AlbumHandlers({ validators, albumServices, songServices })),
    )
  },
}
