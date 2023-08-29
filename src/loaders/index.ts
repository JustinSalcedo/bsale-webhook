import { Express } from 'express'
import expressLoader from './express'
import LoggerInstance from './logger'
import PrinterInstance from './printer'

export default function ({ expressApp }: { expressApp: Express }) {
    // Check initial printer connection
    PrinterInstance.isPrinterConnected()
        .then(isConnected => isConnected
            ? LoggerInstance.info('Printer is connected')
            : LoggerInstance.warn('Printer is not connected')
        )

    // Load express routes
    expressLoader({ app: expressApp })
    LoggerInstance.info('Express loaded')
}