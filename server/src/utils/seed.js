const Users = require('../models/users')
const Channels = require('../models/channels')
const Messages = require('../models/messages')

module.exports = async function seed() {
  const [david, levi, amanda] = await Promise.all([
    Users.create('David Zukowski'),
    Users.create('Levi Thomason'),
    Users.create('Amanda Christopher'),
  ])

  const channel1 = await Channels.create(
    'Test Channel 1',
    [david, levi].map(u => u.id),
  )
  const channel2 = await Channels.create(
    'Test Channel 2',
    [david, levi, amanda].map(u => u.id),
  )

  await Promise.all([
    // Channel 1
    Messages.create('Hello World', channel1.id, david.id),
    Messages.create('Does this thing work?', channel1.id, levi.id),
    Messages.create('I like to write messages', channel1.id, amanda.id),
    Messages.create('Hey guys!', channel1.id, amanda.id),
    // Channel 2
    Messages.create('Goodbye World', channel2.id, david.id),
    Messages.create("Don't do it!", channel2.id, levi.id),
    Messages.create('Who wants margaritas?', channel2.id, amanda.id),
  ])
}
