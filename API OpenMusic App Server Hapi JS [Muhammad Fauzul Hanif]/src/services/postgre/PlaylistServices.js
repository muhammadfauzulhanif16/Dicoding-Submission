const { Pool } = require('pg')
const {
  InvariantError,
  NotFoundError,
  AuthorizationError,
} = require('../../exceptions')
const { uid } = require('uid/secure')

exports.PlaylistServices = (collaborationServices) => {
  const pool = new Pool()

  return {
    addPlaylist: async ({ name, userId }) => {
      const id = `playlist-${uid(16)}`

      const result = await pool.query({
        text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
        values: [id, name, userId],
      })

      return result.rows[0].id
    },
    addActivity: async ({ playlistId, userId, songId, action }) => {
      const createdAt = new Date().toISOString()

      await pool.query({
        text: 'INSERT INTO playlist_activities VALUES($1, $2, $3, $4, $5)',
        values: [playlistId, userId, songId, action, createdAt],
      })
    },
    getPlaylists: async (owner) => {
      const result = await pool.query({
        text: 'SELECT playlists.id, playlists.name, users.username FROM playlists LEFT JOIN users ON playlists.owner = users.id LEFT JOIN collaborations ON playlists.id = collaborations.playlist_id WHERE playlists.owner = $1 OR collaborations.user_id = $1',
        values: [owner],
      })

      return result.rows
    },
    getPlaylist: async ({ id, isActivity = false }) => {
      const result = await pool.query({
        text: isActivity
          ? 'SELECT playlists.id FROM playlists WHERE playlists.id = $1'
          : 'SELECT playlists.id, playlists.name, users.username FROM playlists INNER JOIN users ON playlists.owner = users.id WHERE playlists.id = $1',
        values: [id],
      })

      return result.rows[0]
    },
    getActivities: async (playlistId) => {
      const result = await pool.query({
        text: 'SELECT users.username, songs.title, playlist_activities.action, playlist_activities.created_at AS time FROM playlist_activities INNER JOIN users ON playlist_activities.user_id = users.id INNER JOIN songs ON playlist_activities.song_id = songs.id WHERE playlist_activities.playlist_id = $1',
        values: [playlistId],
      })

      return result.rows
    },
    deletePlaylist: async (id) => {
      await pool.query({
        text: 'DELETE FROM playlists WHERE id = $1',
        values: [id],
      })
    },
    verifyAvailablePlaylist: async (id) => {
      const result = await pool.query({
        text: 'SELECT * FROM playlists WHERE id = $1',
        values: [id],
      })

      if (!result.rowCount) throw new NotFoundError('Paylist not found')
    },
    verifyAvailableSong: async (songId) => {
      const result = await pool.query({
        text: 'SELECT * FROM playlist_songs WHERE song_id = $1',
        values: [songId],
      })

      if (result.rowCount) throw new InvariantError('Song already exists')
    },
    verifyAccess: async function ({ playlistId, userId }) {
      console.log(playlistId, userId)

      try {
        await this.verifyOwner({ playlistId, userId })
      } catch (error) {
        if (error instanceof NotFoundError) throw error

        try {
          await collaborationServices.verifyAvailableCollaboration({
            playlistId,
            userId,
          })
        } catch {
          throw error
        }
      }
    },
    verifyOwner: async ({ playlistId, userId }) => {
      const result = await pool.query({
        text: 'SELECT * FROM playlists WHERE id = $1',
        values: [playlistId],
      })

      if (result.rows[0].owner !== userId)
        throw new AuthorizationError('Unauthorized')
    },
  }
}
