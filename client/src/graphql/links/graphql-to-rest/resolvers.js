import _ from 'lodash'
import Authors from '../../../services/authors'
import Users from '../../../services/users'
import Books from '../../../services/books'
import Bookshelves from '../../../services/book-shelves'

export default {
  Query: {
    user: (root, { id }) => Users.get(id),
    users: () => Users.list(),
    author: (root, { id }) => Authors.get(id),
    authors: () => Authors.list(),
    book: (root, { id }) => Books.get(id),
    books: () => Books.list(),
    bookshelf: (root, { id }) => Bookshelves.get(id),
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
    addBookToBookshelf: async (root, { id, bookId }) => {
      // TODO(zuko): should come from Apollo cache if possible. How?
      const shelf = await Bookshelves.get(id)
      return Bookshelves.update(id, { bookIds: [...shelf.bookIds, bookId] })
    },
    removeBookFromBookshelf: async (root, { id, bookId }) => {
      // TODO(zuko): should come from Apollo cache if possible. How?
      const shelf = await Bookshelves.get(id)
      return Bookshelves.update(id, {
        bookIds: _.without(shelf.bookIds, bookId),
      })
    },
    createBookshelf: async (root, { title, bookIds = [] }) => {
      // NOTE(zuko): we don't have any session info, so just going to pick
      // a random user to create this shelf.
      const user = (await Users.list())[0]
      return Bookshelves.create({ createdBy: user.id, title, bookIds })
    },
  },
}
