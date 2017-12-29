import _ from 'lodash/fp'
import PropTypes from 'prop-types'
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { List } from 'semantic-ui-react'
import ChannelListItem from './ChannelListItem'

class ChannelList extends React.PureComponent {
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

const AvailableChannelsQuery = gql`
  query availableChannels {
    channels {
      id
      name
    }
  }
`

export default graphql(AvailableChannelsQuery, {
  props: ({ data }) => ({
    channels: data.channels,
  }),
})(ChannelList)
