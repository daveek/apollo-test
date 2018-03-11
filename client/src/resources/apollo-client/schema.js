import { makeExecutableSchema } from 'graphql-tools'
import Authors from '../../services/authors'
import Users from '../../services/users'
import Books from '../../services/books'
import BookShelves from '../../services/book-shelves'

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

const resolvers = {
  Query: {
    users: () => Users.list(),
    authors: () => Authors.list(),
    books: () => Books.list(),
    bookShelves: () => BookShelves.list(),
  },
  Author: {
    books: ({ id: authorId }) => Books.list({ authorId }),
  },
}

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
