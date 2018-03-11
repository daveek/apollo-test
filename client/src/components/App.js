import React from 'react'
import { ApolloProvider } from 'react-apollo'
import httpClient from '../resources/apollo-http-client'

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={httpClient}>
        <h1>Hello World</h1>
      </ApolloProvider>
    )
  }
}

export default App
