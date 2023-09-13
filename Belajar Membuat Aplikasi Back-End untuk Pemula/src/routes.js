const handler = require('./handler')

module.exports = [
  {
    method: 'post',
    path: '/books',
    handler: handler.createBook
  },
  {
    method: 'get',
    path: '/books',
    handler: handler.getBooks
  },
  {
    method: 'get',
    path: '/books/{bookId}',
    handler: handler.getBook
  },
  {
    method: 'put',
    path: '/books/{bookId}',
    handler: handler.updateBook
  },
  {
    method: 'delete',
    path: '/books/{bookId}',
    handler: handler.deleteBook
  }
]
