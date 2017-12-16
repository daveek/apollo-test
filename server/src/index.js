const express = require('express')
const ApolloServer = require('apollo-server-express')

const app = express()

app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

app.use('/graphql', ApolloServer.graphqlExpress({
  schema: require('./schema'),
}))
app.use('/graphiql', ApolloServer.graphiqlExpress({
  endpointURL: '/graphql',
}))

module.exports = app
