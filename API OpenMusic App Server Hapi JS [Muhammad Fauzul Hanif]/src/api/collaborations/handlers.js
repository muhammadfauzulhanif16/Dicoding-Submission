exports.CollaborationHandlers = ({
  validators,
  userServices,
  playlistServices,
  collaborationServices,
}) => ({
  addCollaboration: async ({ req, h }) => {
    validators.validateCollaborationPayload(req.payload)

    await collaborationServices.verifyAvailableCollaborator(req.payload)
    await playlistServices.verifyAvailablePlaylist(req.payload.playlistId)
    await userServices.verifyAvailableUser(req.payload.userId)
    await playlistServices.verifyOwner({
      playlistId: req.payload.playlistId,
      userId: req.auth.credentials.userId,
    })
    const collaborationId = await collaborationServices.addCollaboration({
      playlistId: req.payload.playlistId,
      userId: req.payload.userId,
    })

    return h
      .response({
        status: 'success',
        message: 'Collaboration added successfully',
        data: {
          collaborationId,
        },
      })
      .code(201)
  },
  deleteCollaboration: async (req) => {
    validators.validateCollaborationPayload(req.payload)

    await playlistServices.verifyAvailablePlaylist(req.payload.playlistId)
    await playlistServices.verifyOwner({
      playlistId: req.payload.playlistId,
      userId: req.auth.credentials.userId,
    })
    await collaborationServices.deleteCollaboration({
      playlistId: req.payload.playlistId,
      userId: req.payload.userId,
    })

    return {
      status: 'success',
      message: 'Collaboration deleted successfully',
    }
  },
})
