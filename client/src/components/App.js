import React, { Component } from 'react'
import { Form, Grid, Header } from 'semantic-ui-react'
import { ApolloProvider } from 'react-apollo'
import ChannelList from './ChannelList'
import ChannelMessages from './ChannelMessages'
import httpClient from '../resources/apollo-http-client'

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

class App extends Component {
  state = {
    newMessage: '',
    activeChannelId: null,
  }

  handleSelectChannel = channelId => {
    this.setState({ activeChannelId: channelId })
  }

  handleNewMessageChange = e => {
    this.setState({ message: e.target.value })
  }

  handleNewMessageKeyPress = e => {
    // const { message } = this.state

    if (e.key !== 'Enter') return
    this.setState({ message: '' })
  }

  render() {
    const { activeChannelId, newMessage } = this.state

    return (
      <ApolloProvider client={httpClient}>
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
              onSelectChannel={this.handleSelectChannel}
            />
          </Grid.Column>
          <Grid.Column>
            <ChannelMessages channelId={activeChannelId} />
            <Form style={inputFormStyle}>
              <Form.TextArea
                autoHeight
                rows={1}
                value={newMessage}
                onChange={this.handleNewMessageChange}
                onKeyUp={this.handleNewMessageKeyPress}
                style={textAreaStyle}
                placeholder="Message channel..."
              />
            </Form>
          </Grid.Column>
        </Grid>
      </ApolloProvider>
    )
  }
}

export default App
