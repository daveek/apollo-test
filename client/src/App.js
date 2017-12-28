import faker from 'faker'
import _ from 'lodash/fp'
import moment from 'moment'
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
          createdAt
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

  fetchChannels = async () => {
    const channels = await getChannelList()
    const activeChannelId = this.state.activeChannelId || channels[0].id

    this.setState({ activeChannelId, channels }, () => {
      this.fetchMessages()
    })
  }

  fetchMessages = async () => {
    const { activeChannelId } = this.state

    const messages = await getMessagesForChannel(activeChannelId)
    this.setState({
      messages: messages.map(message => ({
        key: message.id,
        image: faker.image.avatar(),
        summary: {
          content: message.user,
          date: moment(message.createdAt).fromNow(),
        },
        extraText: message.content,
      })),
    })
  }

  handleSelectChannel = channelId => {
    this.setState({ activeChannelId: channelId }, () => {
      this.fetchMessages()
    })
  }

  handleNewMessageChange = e => {
    this.setState({ message: e.target.value })
  }

  handleSubmitMessage = e => {
    e.preventDefault()
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
          <Form style={inputFormStyle} onSubmit={this.handleSubmitMessage}>
            <Form.TextArea
              autoHeight
              rows={1}
              value={message}
              onChange={this.handleNewMessageChange}
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
