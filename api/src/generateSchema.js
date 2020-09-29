import fs from 'fs'
import { printSchema } from 'graphql'
import { makeExecutableSchema } from 'apollo-server-express'

import { resolvers } from './gql/resolvers'
import { schema } from './gql/schema'

export function generateSchema() {
    let s = makeExecutableSchema({
        typeDefs: schema,
        resolvers: resolvers,
    })
    fs.writeFileSync('./generated-schema.graphql', printSchema(s))
    return s
}
if (require.main === module) {
    generateSchema()
}
