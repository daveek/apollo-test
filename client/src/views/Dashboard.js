import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Bookshelf from '../components/Bookshelf'
import BookshelfForm from '../components/BookshelfForm'

class Dashboard extends React.Component {
  static propTypes = {
    bookshelves: PropTypes.arrayOf(PropTypes.object),
    refetch: PropTypes.func,
  }

  state = {
    isCreatingShelf: false,
  }

  _toggleCreateShelf = () => {
    this.setState(state => ({ isCreatingShelf: !state.isCreatingShelf }))
  }

  render() {
    const { bookshelves = [], refetch } = this.props
    const { isCreatingShelf } = this.state

    return (
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="heading">Popular Book Shelves</h2>
          <button
            disabled={isCreatingShelf}
            className="btn btn-outline-primary"
            onClick={this._toggleCreateShelf}
          >
            <i className="fa fa-plus mr-2" />
            Create Shelf
          </button>
        </div>
        <div className="card-columns">
          {isCreatingShelf && (
            <BookshelfForm
              onCancel={this._toggleCreateShelf}
              onSubmit={() => {
                this._toggleCreateShelf()
                refetch() // gross, but I'm out of time :(
              }}
            />
          )}
          {bookshelves.map(shelf => <Bookshelf key={shelf.id} {...shelf} />)}
        </div>
      </div>
    )
  }
}

export default graphql(
  gql`
    query Dashboard {
      bookshelves {
        ...BookshelfCard
      }
    }
    ${Bookshelf.fragments.bookshelf}
  `,
  {
    props: ({ data }) => ({
      bookshelves: data.bookshelves,
      isLoading: data.loading,
      refetch: data.refetch,
    }),
  },
)(Dashboard)
