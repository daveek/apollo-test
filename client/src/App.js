import _ from 'lodash/fp'
import React, { Component } from 'react'
import { Form, Grid, Header } from 'semantic-ui-react'

import MessageList from './components/MessageList'
import ChannelList from './components/ChannelList'
import { request } from './utils'

const noFlex = { flex: '0 0 auto' }

const sidebarStyle = {
  ...noFlex,
  width: '15em',
  overflowX: 'hidden',
  overflowY: 'auto',
}

const sidebarHeaderStyle = {
  ...noFlex,
}

const gridStyle = {
  height: '100vh',
}

const inputFormStyle = {
  ...noFlex,
}

const textAreaStyle = {
  maxHeight: '10em',
  border: '2px solid grey',
}

const getChannelList = () => {
  const url = 'http://localhost:4000/graphql'
  const params = {
    query: `{
      channels {
        id,
        name
      }
    }`,
  }

  return request(url, params).then(_.get('data.channels'))
}

const getMessagesForChannel = channelId => {
  const url = 'http://localhost:4000/graphql'
  const params = {
    query: `{
      channel(id: "${channelId}") {
        id,
        name,
        messages {
          content,
          createdAt,
          user {
            id,
            username,
          },
        }
      }
    }`,
  }

  return request(url, params).then(_.get('data.channel.messages'))
}

class App extends Component {
  state = {
    message: '',
    messages: [],
    activeChannelId: null,
  }

  componentDidMount() {
    this.fetchChannels()
  }

  async fetchChannels() {
    const channels = await getChannelList()
    const activeChannelId = this.state.activeChannelId || channels[0].id

    this.setState({ activeChannelId, channels }, () => {
      this.fetchMessages()
    })
  }

  async fetchMessages() {
    const { activeChannelId } = this.state

    this.setState({ messages: await getMessagesForChannel(activeChannelId) })
  }

  handleSelectChannel = channelId => {
    this.setState({ activeChannelId: channelId }, () => {
      this.fetchMessages()
    })
  }

  handleNewMessageChange = e => {
    this.setState({ message: e.target.value })
  }

  // TODO(zuko): this is just for POC, make key handling not terrible
  handleNewMessageKeyPress = e => {
    const { message } = this.state
    if (e.key !== 'Enter') return

    this.setState({ message: '' })
    this.createMessage(message.replace(/\n/g, '')) // TODO(zuko): remove this newline hack
  }

  createMessage = async message => {
    const userId = this.state.messages[0].user.id // TODO(zuko): use an actual user
    const channelId = this.state.activeChannelId
    const query = `
      mutation {
        createMessage(content: "${message}", userId: "${userId}", channelId: "${channelId}") {
          id,
          content,
        }
      }
    `
    const res = await fetch('http://localhost:4000/graphql', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ query }),
    })
    this.fetchMessages()
  }

  render() {
    const { activeChannelId, channels, message, messages } = this.state

    return (
      <Grid columns="equal" padded stretched style={gridStyle}>
        <Grid.Column color="blue" style={sidebarStyle}>
          <Header
            inverted
            icon="code"
            content="Data store"
            style={sidebarHeaderStyle}
          />
          <ChannelList
            activeChannelId={activeChannelId}
            channels={channels}
            onSelectChannel={this.handleSelectChannel}
          />
        </Grid.Column>
        <Grid.Column>
          <MessageList messages={messages} />
          <Form style={inputFormStyle}>
            <Form.TextArea
              autoHeight
              rows={1}
              value={message}
              onChange={this.handleNewMessageChange}
              onKeyUp={this.handleNewMessageKeyPress}
              style={textAreaStyle}
              placeholder="Message channel..."
            />
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default App
