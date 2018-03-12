export default `
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
    updatedAt: Float
    books: [Book]
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
