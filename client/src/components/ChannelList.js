import faker from 'faker'
import _ from 'lodash/fp'
import React, { Component } from 'react'
import { List } from 'semantic-ui-react'

const getChannel = key => ({
  key,
  as: 'a',
  icon: 'hashtag',
  content: faker.hacker.noun(),
})

const getChannelList = () => _.times(getChannel, 10)

class ChannelList extends Component {
  render() {
    return <List inverted link items={getChannelList()} />
  }
}

export default ChannelList
