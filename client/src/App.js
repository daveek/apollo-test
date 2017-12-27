import faker from 'faker'
import _ from 'lodash/fp'
import moment from 'moment'
import React, { Component } from 'react'
import { Form, Feed, Grid, Header, List } from 'semantic-ui-react'

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

const feedStyle = {
  margin: 0,
  overflowY: 'auto',
  paddingBottom: '1em',
}

const textAreaStyle = {
  border: '2px solid grey',
}

class App extends Component {
  getChannelItem = key => ({
    key,
    as: 'a',
    icon: 'hashtag',
    content: faker.hacker.noun(),
  })

  getChannelList = () => _.times(this.getChannelItem, 10)

  getChatMessage = index => ({
    key: index,
    image: faker.image.avatar(),
    summary: {
      content: faker.internet.userName(),
      date: moment(Date.now() - index * 100000).fromNow(),
    },
    extraText: faker.hacker.phrase(),
  })

  getChatMessages = () => _.times(this.getChatMessage, 20).reverse()

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
          <List inverted link items={this.getChannelList()} />
        </Grid.Column>
        <Grid.Column>
          <Feed events={this.getChatMessages()} style={feedStyle} />
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
