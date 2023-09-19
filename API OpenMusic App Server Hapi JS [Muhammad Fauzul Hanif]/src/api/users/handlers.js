exports.UserHandlers = ({ userServices, validators }) => ({
  addUser: async ({ req, h }) => {
    validators.validateUserPayload(req.payload)

    await userServices.verifyUsername(req.payload.username)
    const userId = await userServices.addUser(req.payload)

    return h
      .response({
        status: 'success',
        data: {
          userId,
        },
      })
      .code(201)
  },
})
