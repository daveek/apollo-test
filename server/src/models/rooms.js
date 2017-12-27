const { uuid } = require('../utils')

const MOCK_ROOMS = []

const Rooms = {
  async list() {
    return MOCK_ROOMS
  },
  async get(id) {
    return MOCK_ROOMS.find(r => r.id === id)
  },
  async create(name, users = []) {
    const room = { id: uuid(), name, users }
    MOCK_ROOMS.push(room)
    return room
  },
}

module.exports = Rooms
