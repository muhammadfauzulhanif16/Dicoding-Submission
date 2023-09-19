exports.up = (pgm) =>
  pgm.createTable('playlist_activities', {
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
    song_id: {
      type: 'varchar(30)',
      references: 'songs(id)',
      onDelete: 'cascade',
      notNull: true,
    },
    action: {
      type: 'text',
      notNull: true,
    },
    created_at: {
      type: 'timestamptz',
      notNull: true,
    },
  })

exports.down = (pgm) => pgm.dropTable('playlist_activities')
