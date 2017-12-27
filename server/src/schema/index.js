const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
  type User {
    id: ID!
    username: String!
  }

  type Channel {
    id: ID!
    name: String!
    users: [User]
    messages: [Message]
  }

  type Message {
    id: ID!
    user: User
    channel: Channel
    content: String
  }

  type Query {
    users: [User!]!
    channels: [Channel!]!
  }
`

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers: require('./resolvers'),
})
