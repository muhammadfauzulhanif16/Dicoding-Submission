exports.AuthenticationRoutes = (handlers) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: (req, h) => handlers.addAuthentication({ req, h }),
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: (req) => handlers.updateAuthentication(req),
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: (req) => handlers.deleteAuthentication(req),
  },
]
