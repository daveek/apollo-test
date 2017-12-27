const Users = require('../models/users')
const Rooms = require('../models/rooms')
const Messages = require('../models/messages')

// Create mock data for development
;(async () => {
  const [david, levi, amanda] = await Promise.all([
    Users.create('David Zukowski'),
    Users.create('Levi Thomason'),
    Users.create('Amanda Christopher'),
  ])

  const room1 = await Rooms.create('Test Room 1', [david, levi].map(u => u.id))
  const room2 = await Rooms.create('Test Room 2', [david, levi, amanda].map(u => u.id))

  await Promise.all([
    // Room 1
    Messages.create('Hello World', room1.id, david.id),
    Messages.create('Does this thing work?', room1.id, levi.id),
    Messages.create('I like to write messages', room1.id, amanda.id),
    Messages.create('Hey guys!', room1.id, amanda.id),
    // Room 2
    Messages.create('Goodbye World', room2.id, david.id),
    Messages.create('Don\'t do it!', room2.id, levi.id),
    Messages.create('Who wants margaritas?', room2.id, amanda.id),
  ])
})()

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
