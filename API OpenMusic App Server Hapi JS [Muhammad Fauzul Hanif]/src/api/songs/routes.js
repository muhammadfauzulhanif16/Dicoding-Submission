exports.SongRoutes = (handlers) => [
  {
    method: 'POST',
    path: '/songs',
    handler: (req, h) => handlers.addSong({ req, h }),
  },
  {
    method: 'GET',
    path: '/songs',
    handler: (req) => handlers.getSongs(req),
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: (req) => handlers.getSong(req),
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: (req) => handlers.updateSong(req),
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: (req) => handlers.deleteSong(req),
  },
]
