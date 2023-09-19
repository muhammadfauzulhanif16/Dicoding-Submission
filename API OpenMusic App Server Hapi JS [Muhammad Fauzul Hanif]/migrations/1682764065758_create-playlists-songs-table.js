exports.up = (pgm) => {
  pgm.createTable('playlist_songs', {
    playlist_id: {
      type: 'varchar(30)',
      references: 'playlists(id)',
      onDelete: 'cascade',
      notNull: true,
    },
    song_id: {
      type: 'varchar(30)',
      references: 'songs(id)',
      onDelete: 'cascade',
      notNull: true,
    },
  })

  pgm.addConstraint(
    'playlist_songs',
    'unique_playlist_id_and_song_id',
    'UNIQUE(playlist_id, song_id)',
  )
}

exports.down = (pgm) => pgm.dropTable('playlist_songs')
