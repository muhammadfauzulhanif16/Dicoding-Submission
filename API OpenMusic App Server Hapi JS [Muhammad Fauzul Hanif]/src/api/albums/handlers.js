exports.AlbumHandlers = ({ validators, albumServices, songServices }) => ({
  addAlbum: async ({ req, h }) => {
    validators.validateAlbumPayload(req.payload)

    const albumId = await albumServices.addAlbum(req.payload)

    return h
      .response({
        status: 'success',
        data: {
          albumId,
        },
      })
      .code(201)
  },
  getAlbum: async (req) => {
    await albumServices.verifyAvailableAlbum(req.params.id)
    const album = await albumServices.getAlbum(req.params.id)
    const songs = await songServices.getSongsByAlbum(req.params.id)

    return {
      status: 'success',
      data: {
        album: {
          ...album,
          songs,
        },
      },
    }
  },
  updateAlbum: async (req) => {
    validators.validateAlbumPayload(req.payload)

    await albumServices.verifyAvailableAlbum(req.params.id)
    await albumServices.updateAlbum({
      id: req.params.id,
      payload: req.payload,
    })

    return {
      status: 'success',
      message: 'Album updated successfully',
    }
  },
  deleteAlbum: async (req) => {
    await albumServices.verifyAvailableAlbum(req.params.id)
    await albumServices.deleteAlbum(req.params.id)

    return {
      status: 'success',
      message: 'Album deleted successfully',
    }
  },
})
