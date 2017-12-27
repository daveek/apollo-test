const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
  type User {
    id: ID!
    username: String!
  }

  type Room {
    id: ID!
    name: String!
    users: [User]
  }

  type Query {
    users: [User!]!
    rooms: [Room!]!
  }
`

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers: require('./resolvers'),
})
