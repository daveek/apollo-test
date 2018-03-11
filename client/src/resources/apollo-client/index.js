import { ApolloClient } from 'apollo-client'
import { SchemaLink } from 'apollo-link-schema'
import { InMemoryCache } from 'apollo-cache-inmemory'
import schema from './schema'

export default new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache(),
})
