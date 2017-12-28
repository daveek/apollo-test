import _ from 'lodash/fp'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { List } from 'semantic-ui-react'

import ChannelListItem from './ChannelListItem'

class ChannelList extends Component {
  static propTypes = {
    activeChannelId: PropTypes.string,
    onSelectChannel: PropTypes.func.isRequired,
    channels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    ),
  }

  renderChannelItem = channel => {
    const { activeChannelId, onSelectChannel } = this.props

    return (
      <ChannelListItem
        key={channel.id}
        id={channel.id}
        active={channel.id === activeChannelId}
        name={channel.name}
        onClick={onSelectChannel}
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
