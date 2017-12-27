const Users = require('../models/users')
const Rooms = require('../models/rooms')

// Create mock data for development
;(async () => {
  const [david, levi, amanda] = await Promise.all([
    Users.create('David Zukowski'),
    Users.create('Levi Thomason'),
    Users.create('Amanda Christopher'),
  ])

  await Rooms.create('Test Room 1', [david, levi].map(u => u.id))
  await Rooms.create('Test Room 2', [david, levi, amanda].map(u => u.id))
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
  },
}
