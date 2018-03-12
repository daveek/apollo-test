import Authors from '../../../services/authors'
import Users from '../../../services/users'
import Books from '../../../services/books'
import Bookshelves from '../../../services/book-shelves'

export default {
  Query: {
    user: (_, { id }) => Users.get(id),
    users: () => Users.list(),
    author: (_, { id }) => Authors.get(id),
    authors: () => Authors.list(),
    book: (_, { id }) => Books.get(id),
    books: () => Books.list(),
    bookshelf: (_, { id }) => Bookshelves.get(id),
    bookshelves: () => Bookshelves.list(),
  },
  Author: {
    books: ({ id: authorId }) => Books.list({ authorId }),
  },
  Book: {
    author: ({ authorId }) => Authors.get(authorId),
  },
  Bookshelf: {
    books: ({ bookIds }) => Promise.all(bookIds.map(id => Books.get(id))),
    createdBy: ({ createdBy }) => Users.get(createdBy),
  },
  User: {
    bookshelves: ({ id: userId }) => Bookshelves.list({ userId }),
  },
  Mutation: {
    addBookToBookshelf: async (_, { id, bookId }) => {
      // TODO(zuko): should come from Apollo cache. How?
      const shelf = await Bookshelves.get(id)
      return Bookshelves.update(id, { bookIds: [...shelf.bookIds, bookId] })
    },
    createBookshelf: (_, { userId, title, books }) => {
      return Bookshelves.create({ userId, title, books })
    },
  },
}
