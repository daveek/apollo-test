import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import BookSearch from './BookSearch'
import { compose } from 'react-apollo'

class Bookshelf extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    createdBy: PropTypes.object,
    loading: PropTypes.any,
    updatedAt: PropTypes.number,
    books: PropTypes.arrayOf(PropTypes.object),
    addBook: PropTypes.func.isRequired,
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

  _onAddBook = () => {
    this.props.addBook({
      variables: {
        id: this.props.id,
        bookId: this.state.selectedBookId,
      },
    })
    this.setState({ selectedBookId: null })
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
    const { loading, title, createdBy, updatedAt, books = [] } = this.props
    if (loading) return null
    return (
      <div
        className="card"
        style={{
          boxShadow: '0 2px 5px 0 rgba(0,0,0,.15)',
          borderTop: '4px solid rgb(84, 32, 210)',
        }}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title mb-2">{title}</h5>
            <a
              href="#"
              title="Edit this bookshelf"
              onClick={this._onToggleEditMode}
            >
              <i className="fa fa-edit text-primary" />
            </a>
          </div>
          <h6 className="card-subtitle mb-2 text-muted text-small">
            <small>
              Created by: {createdBy.firstName} {createdBy.lastName}
            </small>
          </h6>
          <hr />
          {editing && this.renderEditTools()}
          <ul>{books.map(book => <li key={book.title}>{book.title}</li>)}</ul>
          <small>
            Last updated on {new Date(updatedAt).toLocaleDateString()}
          </small>
        </div>
      </div>
    )
  }
}

const BookshelfQuery = gql`
  query Bookshelf($id: ID!) {
    bookshelf(id: $id) {
      id
      title
      updatedAt
      createdBy {
        firstName
        lastName
      }
      books {
        id
        title
      }
    }
  }
`

const AddBookMutation = gql`
  mutation addBookToBookshelf($id: ID!, $bookId: ID!) {
    addBookToBookshelf(id: $id, bookId: $bookId) {
      books
    }
  }
`

export default compose(
  graphql(BookshelfQuery, {
    options: props => ({ variables: { id: props.id } }),
    props: ({ data }) => ({
      loading: !!data.loading,
      ...data.bookshelf,
    }),
  }),
  graphql(AddBookMutation, { name: 'addBook' }),
)(Bookshelf)
