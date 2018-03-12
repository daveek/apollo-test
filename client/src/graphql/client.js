import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import GraphQLToRESTLink from './links/graphql-to-rest'

const cache = new InMemoryCache()

/**
 * When migrating from the REST backend to the GraphQL backend, simply
 * replace the `GraphQLToRESTLink` with a link that connects to the
 * GraphQL server (e.g. apollo-link-http). No queries need to change.
 */
const link = ApolloLink.from([new GraphQLToRESTLink({ enableMocks: false })])

export default new ApolloClient({ cache, link })
