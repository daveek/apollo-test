const { uuid } = require('../utils')

const MOCK_CHANNELS = []

const Channels = {
  async list() {
    return MOCK_CHANNELS
  },
  async get(id) {
    return MOCK_CHANNELS.find(c => c.id === id)
  },
  async create(name, users = []) {
    const channel = { id: uuid(), name, users }
    MOCK_CHANNELS.push(channel)
    return channel
  },
}

module.exports = Channels
