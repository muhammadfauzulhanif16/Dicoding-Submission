const { Pool } = require('pg')
const { NotFoundError } = require('../../exceptions')
const { uid } = require('uid/secure')

exports.AlbumServices = () => {
  const pool = new Pool()

  // const addSong = async (albumId, songId) => {
  //   const id = uuid.v4()
  //
  //   const result = await new Pool().query(
  //     'INSERT INTO album_songs VALUES($1, $2, $3)',
  //     [id, albumId, songId],
  //   )
  //
  //   if (!result.rowCount) {
  //     throw new InvariantError(
  //       'Lagu gagal ditambahkan ke album. Album tidak ditemukan',
  //     )
  //   }
  // }

  // const getSongs = async (albumId) => {
  //   const result = await new Pool().query(
  //     'SELECT songs.* FROM songs LEFT JOIN album_songs ON album_songs.song_id = songs.id WHERE album_songs.album_id = $1',
  //     [albumId],
  //   )
  //
  //   return result.rows.map(mapDBToSongsModel)
  // }

  return {
    addAlbum: async (payload) => {
      const { name, year } = payload

      const id = `album-${uid(16)}`
      const result = await pool.query({
        text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
        values: [id, name, year],
      })

      return result.rows[0].id
    },
    getAlbum: async (id) => {
      const result = await pool.query({
        text: 'SELECT * FROM albums WHERE id = $1',
        values: [id],
      })

      return result.rows[0]
    },
    updateAlbum: async ({ id, payload }) => {
      const { name, year } = payload

      await pool.query({
        text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3',
        values: [name, year, id],
      })
    },
    deleteAlbum: async (id) => {
      await pool.query({
        text: 'DELETE FROM albums WHERE id = $1',
        values: [id],
      })
    },
    verifyAvailableAlbum: async (id) => {
      const result = await pool.query({
        text: 'SELECT * FROM albums WHERE id = $1',
        values: [id],
      })

      if (!result.rowCount) throw new NotFoundError('Album not found')
    },
  }
}
