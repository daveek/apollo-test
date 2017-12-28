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
  state = {}

  async componentDidMount() {
    await this.fetchChannels()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeChannelId !== this.state.activeChannelId) {
      this.fetchMessages()
    }
  }

  fetchChannels = async () => {
    const channels = await getChannelList()
    const activeChannelId = this.state.activeChannelId || channels[0].id

    this.setState({ activeChannelId, channels })
  }

  fetchMessages = async () => {
    const { activeChannelId } = this.state

    if (!activeChannelId) {
      return this.setState({ messages: [] })
    }

    const messages = (await getMessagesForChannel(activeChannelId)).map(
      ({ id, createdAt, user, content }) => {
        return {
          key: id,
          image: faker.image.avatar(),
          summary: {
            content: user,
            date: moment(createdAt).fromNow(),
          },
          extraText: content,
        }
      },
    )

    this.setState({ messages })
  }

  handleChannelClick = ({ id }) => this.setState({ activeChannelId: id })

  render() {
    const { activeChannelId, channels, messages } = this.state

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
            onChannelClick={this.handleChannelClick}
          />
        </Grid.Column>
        <Grid.Column>
          <MessageList messages={messages} />
          <Form style={inputFormStyle}>
            <Form.TextArea
              value={JSON.stringify(this.state, null, 2)}
              style={textAreaStyle}
              autoHeight
              rows={1}
              placeholder="Message channel..."
            />
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default App
