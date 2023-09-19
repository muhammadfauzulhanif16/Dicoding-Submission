const { Pool } = require('pg')
const { InvariantError, AuthorizationError } = require('../../exceptions')
const { uid } = require('uid/secure')

exports.CollaborationServices = () => {
  const pool = new Pool()

  return {
    addCollaboration: async ({ playlistId, userId }) => {
      const id = `collaboration-${uid(16)}`
      const result = await pool.query({
        text: 'INSERT INTO collaborations VALUES($1, $2, $3) RETURNING id',
        values: [id, playlistId, userId],
      })

      return result.rows[0].id
    },
    deleteCollaboration: async ({ playlistId, userId }) => {
      await pool.query({
        text: 'DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
        values: [playlistId, userId],
      })
    },
    verifyAvailableCollaborator: async ({ playlistId, userId }) => {
      const result = await pool.query({
        text: 'SELECT * FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
        values: [playlistId, userId],
      })

      if (result.rowCount)
        throw new InvariantError('Collaborator already exists')
    },
    verifyAvailableCollaboration: async ({ playlistId, userId }) => {
      const result = await pool.query({
        text: 'SELECT * FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
        values: [playlistId, userId],
      })

      if (!result.rowCount) throw new AuthorizationError('Unauthorized')
    },
  }
}
