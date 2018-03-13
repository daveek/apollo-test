import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'

class BookshelfItem extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    isEditable: PropTypes.bool,
  }

  _onRemove = () => {
    this.props.onRemove(this.props.id)
  }

  render() {
    const { title, isEditable } = this.props
    return (
      <li className={'book' + (isEditable ? ' book--editable' : '')}>
        <i
          className={'book__icon fa fa-' + (isEditable ? 'times' : 'circle')}
          title={`Remove ${title} from this shelf`}
          onClick={this._onRemove}
        />
        <span className="book__title">{title}</span>
      </li>
    )
  }
}

BookshelfItem.fragments = {
  book: gql`
    fragment BookItem on Book {
      id
      title
    }
  `,
}

export default BookshelfItem
