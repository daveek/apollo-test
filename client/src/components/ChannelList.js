import _ from 'lodash/fp'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { List } from 'semantic-ui-react'

import ChannelListItem from './ChannelListItem'

class ChannelList extends Component {
  static propTypes = {
    activeChannelId: PropTypes.string,
    onChannelClick: PropTypes.func.isRequired,
    channels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    ),
  }

  handleChannelClick = channel => () => {
    _.invokeArgs('onChannelClick', [channel], this.props)
  }

  renderChannelItem = channel => {
    const { activeChannelId } = this.props

    return (
      <ChannelListItem
        key={channel.id}
        active={activeChannelId && channel.id === activeChannelId}
        name={channel.name}
        onClick={this.handleChannelClick(channel)}
      />
    )
  }

  render() {
    const { channels } = this.props

    return (
      <List inverted link>
        {_.map(this.renderChannelItem, channels)}
      </List>
    )
  }
}

export default ChannelList
