const createMockRESTAPI = require('../../utils/mock-rest-api')
const BookShelfModel = require('../../models/book-shelf')

module.exports = createMockRESTAPI(BookShelfModel)
