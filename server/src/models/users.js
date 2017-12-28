const { uuid } = require('../utils')
const faker = require('faker')

const MOCK_USERS = []

const Users = {
  async list() {
    return MOCK_USERS
  },
  async get(id) {
    return MOCK_USERS.find(u => u.id === id)
  },
  async create(username) {
    const user = { id: uuid(), avatarURL: faker.image.avatar(), username }
    MOCK_USERS.push(user)
    return user
  },
}

module.exports = Users
