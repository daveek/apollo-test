const express = require('express')
const ApolloServer = require('apollo-server-express')
const app = express()

app.use(require('morgan')('dev'))
app.use(require('body-parser').json())
app.use(require('cors')())

app.use(
  '/graphql',
  ApolloServer.graphqlExpress({
    schema: require('./schema'),
  }),
)

app.use(
  '/graphiql',
  ApolloServer.graphiqlExpress({
    endpointURL: '/graphql',
  }),
)

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err)
  res.status(err.status || 500)
  res.json({ error: err.message })
})

app.start = async port => {
  return new Promise((resolve, reject) => {
    app.listen(port, () => resolve())
  })
}

module.exports = app
