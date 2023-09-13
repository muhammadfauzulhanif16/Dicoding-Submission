const { nanoid } = require('nanoid')
const { books } = require('./books')

module.exports = {
  createBook: (req, h) => {
    const { name, pageCount, readPage } = req.payload

    if (!name) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku'
        })
        .code(400)
    }

    if (readPage > pageCount) {
      return h
        .response({
          status: 'fail',
          message:
                        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        .code(400)
    }

    const id = nanoid(16)
    const finished = pageCount === readPage
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    books.push({
      id,
      ...req.payload,
      finished,
      insertedAt,
      updatedAt
    })

    return h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id
        }
      })
      .code(201)
  },
  getBooks: (req, h) => {
    const { name, reading, finished } = req.query

    let result = books

    if (name !== undefined) {
      result = books.filter((book) =>
        book.name.toLowerCase().includes(name.toLowerCase())
      )
    }

    if (reading !== undefined) {
      result = books.filter((book) => Number(book.reading) === Number(reading))
    }

    if (finished !== undefined) {
      result = books.filter(
        (book) => Number(book.finished) === Number(finished)
      )
    }

    return h
      .response({
        status: 'success',
        data: {
          books: result.map(({ id, name, publisher }) => ({
            id,
            name,
            publisher
          }))
        }
      })
      .code(200)
  },
  getBook: (req, h) => {
    const { bookId } = req.params

    const book = books.filter(({ id }) => id === bookId)[0]

    if (book === undefined) {
      return h
        .response({
          status: 'fail',
          message: 'Buku tidak ditemukan'
        })
        .code(404)
    }

    return h
      .response({
        status: 'success',
        data: {
          book
        }
      })
      .code(200)
  },
  updateBook: (req, h) => {
    const { bookId } = req.params
    const { name, pageCount, readPage } = req.payload

    if (!name) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku'
        })
        .code(400)
    }

    if (readPage > pageCount) {
      return h
        .response({
          status: 'fail',
          message:
                        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
        .code(400)
    }

    const id = books.findIndex(({ id }) => id === bookId)
    const updatedAt = new Date().toISOString()
    books[id] = {
      ...books[id],
      ...req.payload,
      updatedAt
    }

    if (id === -1) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan'
        })
        .code(404)
    }

    return h
      .response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
      })
      .code(200)
  },
  deleteBook: (req, h) => {
    const { bookId } = req.params

    const id = books.findIndex(({ id }) => id === bookId)
    books.splice(id, 1)

    if (id === -1) {
      return h
        .response({
          status: 'fail',
          message: 'Buku gagal dihapus. Id tidak ditemukan'
        })
        .code(404)
    }

    return h
      .response({
        status: 'success',
        message: 'Buku berhasil dihapus'
      })
      .code(200)
  }
}
