import faker from 'faker'
import moment from 'moment'
import React from 'react'
import { Feed } from 'semantic-ui-react'

const style = {
  margin: 0,
  overflowY: 'auto',
  paddingBottom: '1em',
}

class MessageList extends React.PureComponent {
  componentDidMount() {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    const $node = document.querySelector('#message-list')
    if (!$node) return

    $node.scrollTop = $node.scrollHeight
  }

  render() {
    const messages = this.props.messages.map(message => ({
      key: message.id,
      image: faker.image.avatar(),
      summary: {
        content: message.user.username,
        date: moment(message.createdAt).fromNow(),
      },
      extraText: message.content,
    }))
    return <Feed id="message-list" events={messages} style={style} />
  }
}

export default MessageList
