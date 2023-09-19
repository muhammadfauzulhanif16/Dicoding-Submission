exports.AuthenticationHandlers = ({
  validators,
  tokenManager,
  userServices,
  authenticationServices,
}) => ({
  addAuthentication: async ({ req, h }) => {
    validators.validateAddAuthenticationPayload(req.payload)

    const userId = await userServices.verifyCredential(req.payload)
    const accessToken = tokenManager.generateAccessToken({ userId })
    const refreshToken = tokenManager.generateRefreshToken({ userId })

    await authenticationServices.addRefreshToken(refreshToken)

    return h
      .response({
        status: 'success',
        data: {
          accessToken,
          refreshToken,
        },
      })
      .code(201)
  },
  updateAuthentication: async (req) => {
    validators.validateEditAuthenticationPayload(req.payload)

    await authenticationServices.verifyRefreshToken(req.payload.refreshToken)

    const { userId } = tokenManager.verifyRefreshToken(req.payload.refreshToken)
    const accessToken = tokenManager.generateAccessToken({ userId })

    return {
      status: 'success',
      data: {
        accessToken,
      },
    }
  },
  deleteAuthentication: async (req) => {
    validators.validateDeleteAuthenticationPayload(req.payload)

    await authenticationServices.verifyRefreshToken(req.payload.refreshToken)
    await authenticationServices.deleteRefreshToken(req.payload.refreshToken)

    return {
      status: 'success',
      message: 'Authentication deleted successfully',
    }
  },
})
