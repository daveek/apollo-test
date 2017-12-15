import React, { Component } from 'react'
import { Container, Image, Menu, Segment } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <Container>
        <Menu>
          <Menu.Item header>
            <Image avatar src="//unsplash.it/100" />
            Welcome to React
          </Menu.Item>
        </Menu>
        <Segment>
          To get started, edit <code>src/App.js</code> and save to reload.
        </Segment>
      </Container>
    )
  }
}

export default App
