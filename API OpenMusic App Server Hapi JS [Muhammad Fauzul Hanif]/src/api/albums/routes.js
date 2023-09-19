exports.AlbumRoutes = (handlers) => [
  {
    method: 'POST',
    path: '/albums',
    handler: (req, h) => handlers.addAlbum({ req, h }),
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: (req) => handlers.getAlbum(req),
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: (req) => handlers.updateAlbum(req),
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: (req) => handlers.deleteAlbum(req),
  },
]
