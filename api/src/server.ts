import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import { Context } from './types/context'
import { generateSchema } from './generateSchema'
import mongoose from 'mongoose'
import { models } from '~/mongo/model'

export async function createApp() {
    const app = express()

    try {
        await mongoose.connect('mongodb://localhost:27017/db', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log('DB connect success')
    } catch (error) {
        console.log('errror connecting mongo', error)
    }
    mongoose.connection.on('error', (err) => {
        console.log('mongo error', err)
    })

    const server = new ApolloServer({
        schema: generateSchema(),
        formatError: (err) => {
            console.log('err', JSON.stringify(err, null, 2))
            if (err.extensions?.code === 'UNAUTHENTICATED' || err.extensions?.code === 'UHAUTHORIZED') {
                return err
            } else if (process.env.NODE_ENV === 'development') {
                return err
            }
            return { message: 'some error has occured' }
        },
        context: async ({ req, res }) => {
            const ctx: Context = {
                models,
                req,
                res,
            }

            return ctx
        },
        debug: false,
    })
    server.applyMiddleware({
        app,
        cors: {
            allowedHeaders: [
                'X-Requested-With',
                'Access-Control-Allow-Origin',
                'X-HTTP-Method-Override',
                'Content-Type',
                'Authorization',
                'Accept',
                'credentials',
                'Access-Control-Allow-Credentials',
            ],
            methods: ['GET', 'POST'],
            origin: process.env.ORIGIN,
            credentials: true,
        },
    })

    app.get('/health-check', async (req, res) => {
        res.send({ success: true })
    })

    return app
}
async function main() {
    const app = await createApp()
    const { PORT = 3100 } = process.env || {}
    app.listen(+PORT, (err) => {
        if (err) {
            throw err
        }
        console.log(`[ server ] ready on port ${PORT}`)
    })
}

if (require.main === module) {
    main()
}

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
