const { Pool } = require('pg')
const { InvariantError } = require('../../exceptions')

exports.AuthenticationServices = () => {
  const pool = new Pool()

  return {
    addRefreshToken: async (token) => {
      await pool.query({
        text: 'INSERT INTO authentications VALUES($1)',
        values: [token],
      })
    },
    deleteRefreshToken: async (token) => {
      await pool.query({
        text: 'DELETE FROM authentications WHERE token = $1',
        values: [token],
      })
    },
    verifyRefreshToken: async (token) => {
      const result = await pool.query({
        text: 'SELECT token FROM authentications WHERE token = $1',
        values: [token],
      })

      if (!result.rowCount) throw new InvariantError('Refresh token is invalid')
    },
  }
}
