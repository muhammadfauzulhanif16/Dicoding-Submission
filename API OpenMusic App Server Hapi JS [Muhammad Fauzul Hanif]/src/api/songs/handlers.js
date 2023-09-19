exports.SongHandlers = ({ validators, songServices }) => ({
  addSong: async ({ req, h }) => {
    validators.validateSongPayload(req.payload)

    const songId = await songServices.addSong(req.payload)

    return h
      .response({
        status: 'success',
        data: {
          songId,
        },
      })
      .code(201)
  },
  getSongs: async (req) => {
    const { title, performer } = req.query

    let songs = await songServices.getSongs()
    if (title && performer) {
      songs = await songServices.getSongsByTitleAndPerformer(req.query)
    } else if (title || performer) {
      songs = await songServices.getSongsByTitleOrPerformer(req.query)
    }

    return {
      status: 'success',
      data: {
        songs,
      },
    }
  },
  getSong: async (req) => {
    await songServices.verifyAvailableSong(req.params.id)
    const song = await songServices.getSong(req.params.id)

    return {
      status: 'success',
      data: {
        song,
      },
    }
  },
  updateSong: async (req) => {
    validators.validateSongPayload(req.payload)

    await songServices.verifyAvailableSong(req.params.id)
    await songServices.updateSong({ id: req.params.id, payload: req.payload })

    return {
      status: 'success',
      message: 'Song updated successfully',
    }
  },
  deleteSong: async (req) => {
    await songServices.verifyAvailableSong(req.params.id)
    await songServices.deleteSong(req.params.id)

    return {
      status: 'success',
      message: 'Song deleted successfully',
    }
  },
})
