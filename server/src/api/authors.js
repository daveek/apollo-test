const createMockRESTAPI = require('../utils/mock-rest-api')
const Authors = require('../models/author')
const Books = require('../models/book')

const routes = createMockRESTAPI(Authors)

routes.get('/:id/books', async (req, res, next) => {
  try {
    const books = await Books.list({ authorId: req.params.id })
    res.send(books)
  } catch (e) {
    next(e)
  }
})

module.exports = routes
