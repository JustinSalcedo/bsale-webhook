import { Express } from 'express'
import expressLoader from './express'
import LoggerInstance from './logger'
import { Printer, getDefaultPrinter, getPrinters } from 'pdf-to-printer'

export default function ({ expressApp }: { expressApp: Express }) {
    // Check initial printer connection
    const logPrinterInfo = ({ deviceId, name, paperSizes }: Printer) => LoggerInstance.info(`
        Default printer
        \n- Device ID: ${deviceId}
        \n- Name: ${name}
        \n- Paper sizes: ${paperSizes}
    `)

    getDefaultPrinter().then(defaultPrinter => {
        if (defaultPrinter) logPrinterInfo(defaultPrinter)
        else LoggerInstance.warn('No default printer found')
    }).catch(e => LoggerInstance.error(e))

    getPrinters().then(printers => {
        if (printers) printers.map(logPrinterInfo)
    }).catch(e => LoggerInstance.error(e))

    // Load express routes
    expressLoader({ app: expressApp })
    LoggerInstance.info('Express loaded')
}