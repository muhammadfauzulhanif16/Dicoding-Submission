const { SongHandlers } = require('./handlers')
const { SongRoutes } = require('./routes')

exports.Songs = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { validators, songServices }) => {
    server.route(SongRoutes(SongHandlers({ validators, songServices })))
  },
}
