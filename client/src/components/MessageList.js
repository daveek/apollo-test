import faker from 'faker'
import _ from 'lodash/fp'
import moment from 'moment'
import React, { Component } from 'react'
import { Feed } from 'semantic-ui-react'

const style = {
  margin: 0,
  overflowY: 'auto',
  paddingBottom: '1em',
}

const getMessage = index => ({
  key: index,
  image: faker.image.avatar(),
  summary: {
    content: faker.internet.userName(),
    date: moment(Date.now() - index * 100000).fromNow(),
  },
  extraText: faker.hacker.phrase(),
})

const getMessageList = () => _.times(getMessage, 20).reverse()

class MessageList extends Component {
  componentDidMount() {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    const $node = document.querySelector('#message-list')
    if (!$node) return

    $node.scrollTop = $node.scrollHeight
  }

  render() {
    return <Feed id="message-list" events={getMessageList()} style={style} />
  }
}

export default MessageList
