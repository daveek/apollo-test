import Authors from '../../../services/authors'
import Users from '../../../services/users'
import Books from '../../../services/books'
import BookShelves from '../../../services/book-shelves'

export default {
  Query: {
    users: () => Users.list(),
    authors: () => Authors.list(),
    books: () => Books.list(),
    bookShelves: () => BookShelves.list(),
  },
  Author: {
    books: ({ id: authorId }) => Books.list({ authorId }),
  },
  Book: {
    author: ({ authorId }) => Authors.get(authorId),
  },
  BookShelf: {
    books: ({ bookIds }) => Promise.all(bookIds.map(id => Books.get(id))),
    createdBy: ({ createdBy }) => Users.get(createdBy),
  },
  User: {
    bookShelves: ({ id: userId }) => Books.list({ userId }),
  },
}
