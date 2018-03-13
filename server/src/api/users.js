const createMockRESTAPI = require('../utils/mock-rest-api')
const UserModel = require('../models/user')

module.exports = createMockRESTAPI(UserModel)
