import React from 'react'
import { ApolloProvider } from 'react-apollo'
import client from '../resources/apollo-client'

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <h1>Hello World</h1>
      </ApolloProvider>
    )
  }
}

export default App
