process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const { PORT = 4000 } = process.env
const server = require('../src')
;(async function start() {
  console.info('Starting server...')

  if (process.env.NODE_ENV === 'development') {
    console.info('Seeding database for development...')
    await require('../src/utils/seed')()
    console.log('Database successfully seeded!')
  }
  server.listen(PORT, () => {
    console.info(`Server running on http://localhost:${PORT}`)
  })
})()
