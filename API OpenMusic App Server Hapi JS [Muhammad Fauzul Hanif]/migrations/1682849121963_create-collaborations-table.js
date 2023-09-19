exports.up = (pgm) => {
  pgm.createTable('collaborations', {
    id: {
      type: 'varchar(30)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'varchar(30)',
      references: 'playlists(id)',
      onDelete: 'cascade',
      notNull: true,
    },
    user_id: {
      type: 'varchar(30)',
      references: 'users(id)',
      onDelete: 'cascade',
      notNull: true,
    },
  })

  pgm.addConstraint(
    'collaborations',
    'unique_playlist_id_and_user_id',
    'UNIQUE(playlist_id, user_id)',
  )
}

exports.down = (pgm) => pgm.dropTable('collaborations')
