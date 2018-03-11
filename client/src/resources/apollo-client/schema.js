import { makeExecutableSchema } from 'graphql-tools'
import axios from 'axios'

const typeDefs = `
  type User {
    id: ID!
    firstName: String
    lastName: String,
    bookShelves: [BookShelf]
  }

  type Author {
    id: ID!
    firstName: String
    middleName: String
    lastName: String
    books: [Book]
  }

  type Book {
    id: ID!
    title: String
    author: Author
  }

  type BookShelf {
    id: ID!
    title: String
    createdBy: User
    books: Book
  }

  type Query {
    users: [User]
    authors: [Author]
    books: [Book]
    bookShelves: [BookShelf]
  }

  schema {
    query: Query
  }
`

const api = axios.create({
  baseURL: 'http://localhost:4000',
})
api.interceptors.response.use(async res => res.data)

const resolvers = {
  Query: {
    authors: () => api.get('/authors'),
    books: () => api.get('/books'),
    users: () => api.get('/users'),
  },
  Author: {
    books: ({ id: authorId }) => {
      return api.get(`/authors/${authorId}/books`)
    },
  },
}

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
