import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { Feed } from 'semantic-ui-react'

const style = {
  margin: 0,
  overflowY: 'auto',
  paddingBottom: '1em',
}

export class MessageList extends React.PureComponent {
  static propTypes = {
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        user: PropTypes.shape({
          avatarURL: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
        }).isRequired,
        createdAt: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
      }),
    ),
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    const $node = document.querySelector('#message-list')
    if (!$node) return

    $node.scrollTop = $node.scrollHeight
  }

  render() {
    const { messages = [] } = this.props
    const events = messages.map(message => ({
      key: message.id,
      image: message.user.avatarURL,
      summary: {
        content: message.user.username,
        date: moment(message.createdAt).fromNow(),
      },
      extraText: message.content,
    }))

    return <Feed id="message-list" events={events} style={style} />
  }
}

export default MessageList
