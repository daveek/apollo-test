const { uuid } = require('../utils')

const MOCK_MESSAGES = new Map()

const Messages = {
  async list() {
    return [...MOCK_MESSAGES.values()]
  },
  async get(id) {
    return MOCK_MESSAGES.find(m => m.id === id)
  },
  async create(content, channelId, userId) {
    const message = {
      id: uuid(),
      content,
      channelId,
      userId,
    }
    MOCK_MESSAGES.set(message.id, message)
    return message
  },
}

module.exports = Messages
