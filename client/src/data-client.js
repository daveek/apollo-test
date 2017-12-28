import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

export const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),
})

client
  .query({
    query: gql`
      query DataClientTest {
        users {
          id
        }
      }
    `,
  })
  .then(data => console.log('data', data))
  .catch(error => console.error('error', error))
