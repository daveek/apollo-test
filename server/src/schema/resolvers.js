const Users = require('../models/users')
const Channels = require('../models/channels')
const Messages = require('../models/messages')

module.exports = {
  Query: {
    users: Users.list,
    channels: Channels.list,
    channel: (__, params) => Channels.get(params.id),
  },
  Mutation: {
    async createMessage(root, { content, channelId, userId }) {
      return Messages.create(content, channelId, userId)
    },
  },
  Channel: {
    async users(channel) {
      return Promise.all(channel.users.map(id => Users.get(id)))
    },
    async messages(channel) {
      // TODO(zuko): this is super naive, only good for demo purposes
      return (await Messages.list()).filter(c => c.channelId === channel.id)
    },
  },
  Message: {
    async user(message) {
      return Users.get(message.userId)
    },
  },
}
