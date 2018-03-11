const createMockRESTAPI = require('../../utils/mock-rest-api')
const BookModel = require('../../models/book')

module.exports = createMockRESTAPI(BookModel)
