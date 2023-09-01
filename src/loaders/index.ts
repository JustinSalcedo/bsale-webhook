import { Express } from 'express'
import expressLoader from './express'
import LoggerInstance from './logger'
import { getDefaultPrinter, getPrinters } from 'pdf-to-printer'

export default function ({ expressApp }: { expressApp: Express }) {
    // Check initial printer connection
    getDefaultPrinter().then(defaultPrinter => {
        if (defaultPrinter) {
            const { deviceId, name, paperSizes } = defaultPrinter
            LoggerInstance.info(`
                Default printer
                \n- Device ID: ${deviceId}
                \n- Name: ${name}
                \n- Paper sizes: ${paperSizes}
            `)
        }
        else LoggerInstance.warn('No default printer found')
    }).catch(e => LoggerInstance.error(e))
    getPrinters().then(printers => {
        if (printers) LoggerInstance.info(printers)
    }).catch(e => LoggerInstance.error(e))
    // LoggerInstance.debug(ptp)

    // Load express routes
    expressLoader({ app: expressApp })
    LoggerInstance.info('Express loaded')
}