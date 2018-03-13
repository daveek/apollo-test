export default `
  interface Record {
    id: ID!
    createdAt: Float!
    updatedAt: Float!
  }

  type User implements Record {
    id: ID!
    createdAt: Float!
    updatedAt: Float!
    firstName: String
    lastName: String,
    bookshelves: [Bookshelf]
  }

  type Author implements Record {
    id: ID!
    createdAt: Float!
    updatedAt: Float!
    firstName: String
    middleName: String
    lastName: String
    books: [Book]
  }

  type Book implements Record {
    id: ID!
    createdAt: Float!
    updatedAt: Float!
    title: String
    author: Author
  }

  type Bookshelf implements Record {
    id: ID!
    createdAt: Float!
    updatedAt: Float!
    title: String
    createdBy: User
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
    addBookToBookshelf(id: ID!, bookId: ID!): Bookshelf
    removeBookFromBookshelf(id: ID!, bookId: ID!): Bookshelf
    createBook(title: String!, authorId: ID!): Book
    createAuthor(firstName: String!, lastName: String!, middleName: String): Author
    createBookshelf(title: String!, bookIds: [ID]!): Bookshelf
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
