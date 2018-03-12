export default `
  type User {
    id: ID!
    firstName: String
    lastName: String,
    bookshelves: [Bookshelf]
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

  type Bookshelf {
    id: ID!
    title: String
    createdBy: User
    updatedAt: Float
    books: [Book]
  }

  type Query {
    user(id: ID!): User
    users: [User]
    author(id: ID!): Author
    authors: [Author]
    book(id: ID!): Book
    books: [Book]
    bookshelf(id: ID!): Bookshelf
    bookshelves: [Bookshelf]
  }

  type Mutation {
    createBookshelf(userId: ID!, title: String!, books: [ID!]): Bookshelf
    addBookToBookshelf(id: ID!, bookId: ID!): Bookshelf
    removeBookFromBookshelf(id: ID!, bookId: ID!): Bookshelf
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
