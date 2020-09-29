import { Request, Response } from 'express'
import { SqlmancerClient } from '../sqlmancer/generated'
import { User } from '../types/gen-types'
import { Mongoose } from 'mongoose'
import { models } from '~/mongo/model'

export type Context = { models: typeof models; req: Request; res: Response }
