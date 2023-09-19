exports.up = (pgm) =>
  pgm.createTable('songs', {
    id: {
      type: 'varchar(30)',
      primaryKey: true,
    },
    title: {
      type: 'varchar(255)',
      notNull: true,
    },
    year: {
      type: 'smallserial',
      notNull: true,
    },
    genre: {
      type: 'varchar(255)',
      notNull: true,
    },
    performer: {
      type: 'varchar(255)',
      notNull: true,
    },
    duration: {
      type: 'smallint',
    },
    album_id: {
      type: 'varchar(30)',
      references: 'albums(id)',
      onDelete: 'cascade',
    },
  })

exports.down = (pgm) => pgm.dropTable('songs')
