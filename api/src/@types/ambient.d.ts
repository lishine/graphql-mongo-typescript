declare module 'postgres' {
    type Postgres = any
    export type Sql = any
    function postgres(url: string, obj?: Record<string, any>): Sql
    function postgres(obj?: Record<string, any>): Sql
    export default postgres
}
declare module 'chai-json-pattern'
declare module 'pwd'
declare namespace Chai {
    export interface Assertion {
        matchPattern: any
    }
}

declare namespace NodeJS {
    export interface ProcessEnv {
        USER_TOKEN_SECRET: string
        USER_TOKEN_EXPIRE_IN: string
        TOKEN_COOKIE_NAME: string
        PG_CONNECTION_STRING: string
        NODE_ENV: string
        COOKIE_DOMAIN: string
        ORIGIN: string
    }
}
