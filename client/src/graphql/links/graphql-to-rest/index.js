import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import typeDefs from './type-defs'
import resolvers from './resolvers'
import mocks from './mocks'

export default ({ enableMocks = false }) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })
  if (enableMocks) {
    addMockFunctionsToSchema({
      schema,
      mocks,
    })
  }
  return new SchemaLink({ schema })
}
