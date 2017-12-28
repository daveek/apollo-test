import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { List } from 'semantic-ui-react'

class ChannelListItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func,
  }

  render() {
    const { active, name, onClick } = this.props

    return (
      <List.Item
        as="a"
        icon="hashtag"
        content={name}
        active={active}
        onClick={onClick}
      />
    )
  }
}

export default ChannelListItem
