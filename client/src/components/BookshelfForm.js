import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

/**
 * NOTE(zuko): I really wanted to reuse the base Bookshelf component for this,
 * but in the interest of accomplishing the actual goals for this project I
 * opted to forego the refactoring.
 */
class BookshelfForm extends React.Component {
  static propTypes = {
    createBookshelf: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    title: '',
  }

  _onCancel = e => {
    e.preventDefault()
    this.props.onCancel()
  }

  _onSubmit = async e => {
    e.preventDefault()
    await this.props.createBookshelf({
      variables: {
        title: this.state.title,
        bookIds: [],
      },
    })
    this.props.onSubmit()
  }

  _onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { title } = this.state

    return (
      <form className="card bookshelf pt-3" onSubmit={this._onSubmit}>
        <a
          href="#"
          className="bookshelf__action"
          title="Discard this bookshelf"
          onClick={this._onCancel}
        >
          <i className="fa fa-trash text-danger" />
        </a>
        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={title}
              className="form-control"
              placeholder="Name your book shelf"
              onChange={this._onInputChange}
              autoFocus
            />
          </div>
        </div>
      </form>
    )
  }
}

// NOTE(zuko): in reality we would actually care about who is creating the bookshelf
const CreateBookshelfMutation = gql`
  mutation createBookshelf($title: String!, $bookIds: [ID]!) {
    createBookshelf(title: $title, bookIds: $bookIds) {
      id
      updatedAt
    }
  }
`
export default graphql(CreateBookshelfMutation, {
  name: 'createBookshelf',
})(BookshelfForm)
