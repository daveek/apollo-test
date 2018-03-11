const createMockRESTAPI = require('../../utils/mock-rest-api')
const AuthorModel = require('../../models/author')

module.exports = createMockRESTAPI(AuthorModel)
