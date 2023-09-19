exports.up = (pgm) =>
  pgm.createTable('users', {
    id: {
      type: 'varchar(30)',
      primaryKey: true,
    },
    username: {
      type: 'varchar(255)',
      unique: true,
      notNull: true,
    },
    password: {
      type: 'varchar(255)',
      notNull: true,
    },
    fullname: {
      type: 'varchar(255)',
      notNull: true,
    },
  })

exports.down = (pgm) => pgm.dropTable('users')
