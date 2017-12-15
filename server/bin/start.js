const { PORT = 4000 } = process.env

const server = require('../src')

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
