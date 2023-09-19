exports.up = (pgm) =>
  pgm.createTable('albums', {
    id: {
      type: 'varchar(30)',
      primaryKey: true,
    },
    name: {
      type: 'varchar(255)',
      notNull: true,
    },
    year: {
      type: 'smallserial',
      notNull: true,
    },
  })

exports.down = (pgm) => pgm.dropTable('albums')
