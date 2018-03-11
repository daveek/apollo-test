import React from 'react'
import { ApolloProvider } from 'react-apollo'
import client from '../resources/apollo-client'
import gql from 'graphql-tag'

const query = gql`
  query {
    authors {
      firstName
      books {
        title
      }
    }
  }
`

const log = res => console.log(JSON.stringify(res, null, 2))
client.query({ query }).then(log, console.error)

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
