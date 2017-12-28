import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { List } from 'semantic-ui-react'

class ChannelListItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func,
  }

  handleClick = () => {
    this.props.onClick(this.props.id)
  }

  render() {
    const { active, name } = this.props

    return (
      <List.Item
        as="a"
        icon="hashtag"
        content={name}
        active={active}
        onClick={this.handleClick}
      />
    )
  }
}

export default ChannelListItem
