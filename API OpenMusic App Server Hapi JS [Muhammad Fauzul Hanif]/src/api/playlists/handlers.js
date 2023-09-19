exports.PlaylistHandlers = ({
  validators,
  songServices,
  playlistServices,
}) => ({
  addPlaylist: async ({ req, h }) => {
    validators.validatePlaylistPayload(req.payload)

    const playlistId = await playlistServices.addPlaylist({
      name: req.payload.name,
      userId: req.auth.credentials.userId,
    })

    return h
      .response({
        status: 'success',
        data: {
          playlistId,
        },
      })
      .code(201)
  },
  addSong: async ({ req, h }) => {
    validators.validateSongToPlaylistPayload(req.payload)

    await playlistServices.verifyAvailablePlaylist(req.params.id)
    await playlistServices.verifyAccess({
      playlistId: req.params.id,
      userId: req.auth.credentials.userId,
    })
    await songServices.verifyAvailableSong(req.payload.songId)
    await playlistServices.verifyAvailableSong(req.payload.songId)
    await songServices.addSongToPlaylist({
      playlistId: req.params.id,
      songId: req.payload.songId,
    })
    await playlistServices.addActivity({
      playlistId: req.params.id,
      userId: req.auth.credentials.userId,
      songId: req.payload.songId,
      action: 'add',
    })

    return h
      .response({
        status: 'success',
        message: 'Song added to playlist',
      })
      .code(201)
  },
  getPlaylists: async (req) => {
    const playlists = await playlistServices.getPlaylists(
      req.auth.credentials.userId,
    )

    return {
      status: 'success',
      data: {
        playlists,
      },
    }
  },
  getPlaylist: async (req) => {
    await playlistServices.verifyAvailablePlaylist(req.params.id)
    await playlistServices.verifyAccess({
      playlistId: req.params.id,
      userId: req.auth.credentials.userId,
    })

    const playlist = await playlistServices.getPlaylist({ id: req.params.id })
    const songs = await songServices.getSongsByPlaylist(req.params.id)

    return {
      status: 'success',
      data: {
        playlist: {
          ...playlist,
          songs,
        },
      },
    }
  },
  getActivities: async (req) => {
    await playlistServices.verifyAvailablePlaylist(req.params.id)
    await playlistServices.verifyOwner({
      playlistId: req.params.id,
      userId: req.auth.credentials.userId,
    })

    const { id } = await playlistServices.getPlaylist({
      id: req.params.id,
      isActivity: true,
    })
    const activities = await playlistServices.getActivities(req.params.id)

    return {
      status: 'success',
      data: {
        playlistId: id,
        activities,
      },
    }
  },
  deletePlaylist: async (req) => {
    await playlistServices.verifyAvailablePlaylist(req.params.id)
    await playlistServices.verifyOwner({
      playlistId: req.params.id,
      userId: req.auth.credentials.userId,
    })
    await playlistServices.deletePlaylist(req.params.id)

    return {
      status: 'success',
      message: 'Playlist deleted successfully',
    }
  },
  deleteSong: async (req) => {
    validators.validateSongToPlaylistPayload(req.payload)

    await songServices.verifyAvailableSong(req.payload.songId)
    await playlistServices.verifyAccess({
      playlistId: req.params.id,
      userId: req.auth.credentials.userId,
    })
    await songServices.deleteSongFromPlaylist({
      playlistId: req.params.id,
      songId: req.payload.songId,
    })
    await playlistServices.addActivity({
      playlistId: req.params.id,
      userId: req.auth.credentials.userId,
      songId: req.payload.songId,
      action: 'delete',
    })

    return {
      status: 'success',
      message: 'Song deleted from playlist',
    }
  },
})
