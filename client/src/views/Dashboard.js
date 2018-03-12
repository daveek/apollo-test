import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const BookShelf = ({ title, createdBy, updatedAt, books }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <h6 className="card-subtitle mb-2 text-muted">
        Created by: {createdBy.firstName} {createdBy.lastName}
      </h6>
      <ul>{books.map(book => <li key={book.title}>{book.title}</li>)}</ul>
    </div>
    <small className="card-footer">
      Last updated on {new Date(updatedAt).toLocaleDateString()}
    </small>
  </div>
)

class Dashboard extends React.Component {
  render() {
    const { data: { bookShelves = [] } } = this.props
    return (
      <div className="container">
        <h2>Popular Book Shelves</h2>
        <div className="card-deck">
          {bookShelves.map(shelf => <BookShelf key={shelf.id} {...shelf} />)}
        </div>
      </div>
    )
  }
}

export default graphql(gql`
  query Dashboard {
    bookShelves {
      id
      title
      updatedAt
      createdBy {
        firstName
        lastName
      }
      books {
        title
      }
    }
  }
`)(Dashboard)
