import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Bookshelf from '../components/Bookshelf'

class Dashboard extends React.Component {
  render() {
    const { data: { bookshelves = [] } } = this.props
    return (
      <div className="container">
        <h2 className="mb-4">Popular Book Shelves</h2>
        <div className="card-columns">
          {bookshelves.map(({ id }) => <Bookshelf key={id} id={id} />)}
        </div>
      </div>
    )
  }
}

export default graphql(gql`
  query Dashboard {
    bookshelves {
      id
    }
  }
`)(Dashboard)
