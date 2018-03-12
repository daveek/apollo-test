import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './type-defs'
import resolvers from './resolvers'

export default () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })
  return new SchemaLink({ schema })
}
