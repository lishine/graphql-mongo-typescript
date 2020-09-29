import { ApolloError } from 'apollo-server-express'

export const throwIf = (condition: boolean, Error: ApolloError) => {
    if (condition) {
        throw Error
    }
}

export const isEmptyObject = (obj: Record<string, any>) => {
    return Object.getOwnPropertyNames(obj).length === 0
}
