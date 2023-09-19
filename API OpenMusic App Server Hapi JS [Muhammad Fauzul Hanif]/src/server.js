require('dotenv').config()
const Hapi = require('@hapi/hapi')
const Jwt = require('@hapi/jwt')

const {
  Songs,
  Albums,
  Users,
  Authentications,
  Playlists,
  Collaborations,
} = require('./api')
const {
  SongValidator,
  AlbumValidator,
  UserValidator,
  AuthenticationValidator,
  PlaylistValidator,
  CollaborationValidator,
} = require('./validator')
const {
  SongServices,
  AlbumServices,
  UserServices,
  AuthenticationServices,
  PlaylistServices,
  CollaborationServices,
} = require('./services')

const { ClientError } = require('./exceptions')
const { TokenManager } = require('./tokenize/TokenManager')

const init = async () => {
  const userServices = UserServices()
  const authenticationServices = AuthenticationServices()
  const albumServices = AlbumServices()
  const songServices = SongServices()
  const collaborationServices = CollaborationServices()
  const playlistServices = PlaylistServices(collaborationServices)

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  })

  await server.register([
    {
      plugin: Jwt.plugin,
    },
  ])

  server.auth.strategy('openmusic', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        userId: artifacts.decoded.payload.userId,
      },
    }),
  })

  await server.register([
    {
      plugin: Users,
      options: {
        userServices,
        validators: UserValidator,
      },
    },
    {
      plugin: Authentications,
      options: {
        validators: AuthenticationValidator,
        userServices,
        tokenManager: TokenManager,
        authenticationServices,
      },
    },
    {
      plugin: Albums,
      options: {
        validators: AlbumValidator,
        albumServices,
        songServices,
      },
    },
    {
      plugin: Songs,
      options: {
        validators: SongValidator,
        songServices,
      },
    },
    {
      plugin: Collaborations,
      options: {
        collaborationServices,
        playlistServices,
        userServices,
        validators: CollaborationValidator,
      },
    },
    {
      plugin: Playlists,
      options: {
        playlistServices,
        songServices,
        validators: PlaylistValidator,
      },
    },
  ])

  server.ext('onPreResponse', (req, h) => {
    const { response } = req

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: response.message,
          })
          .code(response.statusCode)
      }

      if (!response.isServer) {
        return h.continue
      }

      return h
        .response({
          status: 'error',
          message: 'terjadi kegagalan pada server kami',
        })
        .code(500)
    }

    return h.continue
  })

  await server.start()
}

init()
