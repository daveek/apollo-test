import React, { Component } from 'react'
import { Feed } from 'semantic-ui-react'

const style = {
  margin: 0,
  overflowY: 'auto',
  paddingBottom: '1em',
}

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
    const { messages } = this.props
    return <Feed id="message-list" events={messages} style={style} />
  }
}

export default MessageList
