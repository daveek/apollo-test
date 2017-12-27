import React, { Component } from 'react'
import { Form, Grid, Header } from 'semantic-ui-react'

import MessageList from './components/MessageList'
import ChannelList from './components/ChannelList'

const noFlex = { flex: '0 0 auto' }

const sidebarStyle = {
  ...noFlex,
  width: '15em',
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
  border: '2px solid grey',
}

class App extends Component {
  render() {
    return (
      <Grid columns="equal" padded stretched style={gridStyle}>
        <Grid.Column color="blue" style={sidebarStyle}>
          <Header
            inverted
            icon="code"
            content="Data store"
            style={sidebarHeaderStyle}
          />
          <ChannelList />
        </Grid.Column>
        <Grid.Column>
          <MessageList />
          <Form style={inputFormStyle}>
            <Form.TextArea
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
