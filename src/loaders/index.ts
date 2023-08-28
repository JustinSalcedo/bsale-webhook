import { Express } from 'express'
import expressLoader from './express'
import Logger from './logger'

export default function ({ expressApp }: { expressApp: Express }) {
    // Load express routes
    expressLoader({ app: expressApp })
    Logger.info('Express loaded')
}