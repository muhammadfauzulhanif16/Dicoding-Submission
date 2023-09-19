const { PlaylistHandlers } = require('./handlers')
const { PlaylistRoutes } = require('./routes')

exports.Playlists = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, { validators, songServices, playlistServices }) => {
    server.route(
      PlaylistRoutes(
        PlaylistHandlers({ validators, songServices, playlistServices }),
      ),
    )
  },
}
