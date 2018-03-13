import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Select from 'react-select'

class BookSearch extends React.Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object),
    excludedIds: PropTypes.arrayOf(PropTypes.string),
    style: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    value: null,
  }

  _onChange = opt => {
    const value = opt ? opt.value : null
    this.setState({ value })
    this.props.onChange(value)
  }

  render() {
    const { value } = this.state
    const { books = [], excludedIds, style } = this.props
    const options = books
      .filter(({ id }) => !_.includes(excludedIds, id))
      .map(({ id, title }) => ({ label: title, value: id }))

    return (
      <div style={style}>
        <Select
          name="book-search"
          value={value || ''}
          options={options}
          onChange={this._onChange}
        />
      </div>
    )
  }
}

const BookSearchQuery = gql`
  query BookSearch {
    books {
      id
      title
    }
  }
`

export default graphql(BookSearchQuery, {
  options: { variables: { id: '18' } },
  props: ({ data }) => ({ ...data }),
})(BookSearch)
