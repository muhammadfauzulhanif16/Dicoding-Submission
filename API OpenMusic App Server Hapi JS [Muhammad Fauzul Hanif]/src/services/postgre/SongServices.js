const { Pool } = require('pg')
const { NotFoundError } = require('../../exceptions')
const { uid } = require('uid/secure')

exports.SongServices = () => {
  const pool = new Pool()

  return {
    addSong: async (payload) => {
      const { title, year, genre, performer, duration, albumId } = payload

      const id = `song-${uid(16)}`
      const result = await pool.query({
        text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        values: [id, title, year, genre, performer, duration, albumId],
      })

      return result.rows[0].id
    },
    addSongToPlaylist: async ({ playlistId, songId }) => {
      await pool.query({
        text: 'INSERT INTO playlist_songs VALUES($1, $2)',
        values: [playlistId, songId],
      })
    },
    getSongs: async () => {
      const result = await pool.query({
        text: 'SELECT id, title, performer FROM songs',
      })

      return result.rows
    },
    getSongsByPlaylist: async (playlistId) => {
      const result = await pool.query({
        text: 'SELECT songs.id, songs.title, songs.performer FROM songs INNER JOIN playlist_songs ON songs.id = playlist_songs.song_id WHERE playlist_songs.playlist_id = $1',
        values: [playlistId],
      })

      return result.rows
    },
    getSongsByTitleAndPerformer: async (params) => {
      const { title, performer } = params

      const result = await pool.query({
        text: 'SELECT id, title, performer FROM songs WHERE LOWER(title) LIKE LOWER($1) AND LOWER(performer) LIKE LOWER($2)',
        values: [`%${title}%`, `%${performer}%`],
      })

      return result.rows
    },
    getSongsByTitleOrPerformer: async (params) => {
      const { title, performer } = params

      const result = await pool.query({
        text: 'SELECT id, title, performer FROM songs WHERE LOWER(title) LIKE LOWER($1) OR LOWER(performer) LIKE LOWER($2)',
        values: [`%${title}%`, `%${performer}%`],
      })

      return result.rows
    },
    getSongsByAlbum: async (albumId) => {
      const result = await pool.query({
        text: 'SELECT id, title, performer FROM songs WHERE album_id = $1',
        values: [albumId],
      })

      return result.rows
    },
    getSong: async (id) => {
      const result = await pool.query({
        text: 'SELECT * FROM songs WHERE id = $1',
        values: [id],
      })

      return result.rows[0]
    },
    updateSong: async ({ id, payload }) => {
      const { title, year, genre, performer, duration, albumId } = payload

      await pool.query({
        text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6 WHERE id = $7',
        values: [title, year, genre, performer, duration, albumId, id],
      })
    },
    deleteSong: async (id) => {
      await pool.query({
        text: 'DELETE FROM songs WHERE id = $1',
        values: [id],
      })
    },
    deleteSongFromPlaylist: async ({ playlistId, songId }) => {
      await pool.query({
        text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2',
        values: [playlistId, songId],
      })
    },
    verifyAvailableSong: async (id) => {
      const result = await pool.query({
        text: 'SELECT * FROM songs WHERE id = $1',
        values: [id],
      })

      if (!result.rowCount) throw new NotFoundError('Song not found')
    },
  }
}
