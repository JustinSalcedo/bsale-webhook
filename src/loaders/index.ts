import { Express } from 'express'
import expressLoader from './express'
import LoggerInstance from './logger'
import { Printer, getPrinters } from 'pdf-to-printer'
import config from '../config'
import PrinterHandlerInstance from './printer'

export default function ({ expressApp }: { expressApp: Express }) {
    // Check initial printer connection
    PrinterHandlerInstance.logAllPrintersDetails()

    LoggerInstance.info('Printing to: ' + config.printer.name)

    // Load express routes
    expressLoader({ app: expressApp })
    LoggerInstance.info('Express loaded')
}