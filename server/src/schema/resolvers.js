const Users = require('../models/users')
const Rooms = require('../models/rooms')
const Messages = require('../models/messages')

module.exports = {
  Query: {
    users: Users.list,
    rooms: Rooms.list,
  },
  Room: {
    async users(room) {
      return Promise.all(room.users.map(id => Users.get(id)))
    },
    async messages(room) {
      // TODO(zuko): this is super naive, only good for demo purposes
      return (await Messages.list()).filter(m => m.roomId === room.id)
    }
  },
  Message: {
    async user(message) {
      return Users.get(message.userId)
    }
  },
}
