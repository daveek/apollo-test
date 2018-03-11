import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import schema from './schema'
import { graphql } from 'graphql'

const query = `
  {
    authors {
      firstName
      lastName
      books {
        title
      }
    }
  }
`
;(async () => {
  console.log('run test GraphQL query')
  await graphql(schema, query).then(console.log, console.error)
})()

// NOTE: unused at the moment
export default new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),
})
