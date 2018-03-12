import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import GraphQLToRESTLink from './links/graphql-to-rest'

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: new GraphQLToRESTLink(),
})
