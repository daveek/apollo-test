import React from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import BookSearch from './BookSearch'
import BookshelfItem from './BookshelfItem'
import './Bookshelf.css'

class Bookshelf extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    createdBy: PropTypes.object,
    updatedAt: PropTypes.number,
    books: PropTypes.arrayOf(PropTypes.object),
    addBook: PropTypes.func.isRequired,
    removeBook: PropTypes.func.isRequired,
  }

  state = {
    editing: false,
    selectedBookId: null,
  }

  _onToggleEditMode = () => {
    this.setState(state => ({ editing: !state.editing, selectedBook: null }))
  }

  _onSelectBook = bookId => {
    this.setState({ selectedBookId: bookId })
  }

  _onAddBook = async () => {
    await this.props.addBook({
      variables: {
        id: this.props.id,
        bookId: this.state.selectedBookId,
      },
    })
    this.setState({ selectedBookId: null })
  }

  _onRemoveBook = async id => {
    await this.props.removeBook({
      variables: {
        id: this.props.id,
        bookId: id,
      },
    })
  }

  renderEditTools() {
    const { selectedBookId } = this.state
    const { books = [] } = this.props

    return (
      <div className="mb-3">
        <div className="d-flex">
          <BookSearch
            value={selectedBookId}
            excludedIds={books.map(book => book.id)}
            onChange={this._onSelectBook}
            style={{ flexGrow: 1 }}
          />
          <button
            className="btn btn-sm btn-outline-primary ml-1"
            onClick={this._onAddBook}
            disabled={!selectedBookId}
          >
            Add Book
          </button>
        </div>
      </div>
    )
  }

  render() {
    const { editing } = this.state
    const { title, createdBy, updatedAt, books = [] } = this.props
    return (
      <div
        className={'card bookshelf' + (editing ? ' bookshelf--editing' : '')}
      >
        <a
          href="#"
          className="bookshelf__action"
          title="Edit this bookshelf"
          onClick={this._onToggleEditMode}
        >
          <i className="fa fa-edit text-primary" />
        </a>
        <div className="card-body">
          <h5 className="card-title mb-2">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted text-small">
            <small>
              Created by: {createdBy.firstName} {createdBy.lastName}
            </small>
          </h6>
          <hr />
          {editing && this.renderEditTools()}
          <ul className="bookshelf__book-list">
            {books.map(book => (
              <BookshelfItem
                key={book.title}
                {...book}
                isEditable={editing}
                onRemove={this._onRemoveBook}
              />
            ))}
          </ul>
          <small>Last updated on {new Date(updatedAt).toLocaleString()}</small>
        </div>
      </div>
    )
  }
}

const AddBookMutation = gql`
  mutation addBookToBookshelf($id: ID!, $bookId: ID!) {
    addBookToBookshelf(id: $id, bookId: $bookId) {
      id
      updatedAt
      books {
        id
        title
      }
    }
  }
`

const RemoveBookMutation = gql`
  mutation removeBookFromBookshelf($id: ID!, $bookId: ID!) {
    removeBookFromBookshelf(id: $id, bookId: $bookId) {
      id
      updatedAt
      books {
        id
        title
      }
    }
  }
`

Bookshelf.fragments = {
  bookshelf: gql`
    fragment BookshelfCard on Bookshelf {
      id
      title
      updatedAt
      createdBy {
        firstName
        lastName
      }
      books {
        ...BookItem
      }
    }
    ${BookshelfItem.fragments.book}
  `,
}

export default compose(
  graphql(AddBookMutation, { name: 'addBook' }),
  graphql(RemoveBookMutation, { name: 'removeBook' }),
)(Bookshelf)
