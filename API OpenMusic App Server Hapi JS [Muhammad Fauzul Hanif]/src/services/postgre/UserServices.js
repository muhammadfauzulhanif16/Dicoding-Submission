const { Pool } = require('pg')
const bcrypt = require('bcrypt')
const {
  InvariantError,
  AuthenticationError,
  NotFoundError,
} = require('../../exceptions')
const { uid } = require('uid/secure')

exports.UserServices = () => {
  const pool = new Pool()

  return {
    addUser: async (payload) => {
      const { username, password, fullname } = payload

      const id = `user-${uid(16)}`
      const hashedPassword = await bcrypt.hash(password, 16)
      const result = await pool.query({
        text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
        values: [id, username, hashedPassword, fullname],
      })

      return result.rows[0].id
    },
    verifyAvailableUser: async (id) => {
      const result = await pool.query({
        text: 'SELECT * FROM users WHERE id = $1',
        values: [id],
      })

      if (!result.rowCount) throw new NotFoundError('User not found')
    },
    verifyUsername: async (username) => {
      const result = await pool.query({
        text: 'SELECT username FROM users WHERE username = $1',
        values: [username],
      })

      if (result.rowCount) throw new InvariantError('Username not available')
    },
    verifyCredential: async (payload) => {
      const { username, password } = payload

      const result = await pool.query({
        text: 'SELECT id, password FROM users WHERE username = $1',
        values: [username],
      })
      if (!result.rowCount)
        throw new AuthenticationError('Incorrect credentials')

      const { id, password: hashedPassword } = result.rows[0]
      if (!(await bcrypt.compare(password, hashedPassword)))
        throw new AuthenticationError('Incorrect credentials')

      return id
    },
  }
}
