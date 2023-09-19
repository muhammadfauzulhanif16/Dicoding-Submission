exports.up = (pgm) =>
  pgm.createTable('playlists', {
    id: {
      type: 'varchar(30)',
      primaryKey: true,
    },
    name: {
      type: 'varchar(255)',
      notNull: true,
    },
    owner: {
      type: 'varchar(30)',
      references: 'users(id)',
      onDelete: 'cascade',
      notNull: true,
    },
  })

exports.down = (pgm) => pgm.dropTable('playlists')
