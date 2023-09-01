import { Express } from 'express'
import expressLoader from './express'
import LoggerInstance from './logger'
import ptp from 'pdf-to-printer'

export default function ({ expressApp }: { expressApp: Express }) {
    // Check initial printer connection
    // ptp.getDefaultPrinter().then(defaultPrinter => {
    //     if (defaultPrinter) {
    //         const { deviceId, name, paperSizes } = defaultPrinter
    //         LoggerInstance.info(`
    //             Default printer
    //             \n- Device ID: ${deviceId}
    //             \n- Name: ${name}
    //             \n- Paper sizes: ${paperSizes}
    //         `)
    //     }
    //     else LoggerInstance.warn('No default printer found')
    // })
    // ptp.getPrinters().then(printers => {
    //     if (printers) LoggerInstance.info(printers)
    // })
    LoggerInstance.debug(ptp)

    // Load express routes
    expressLoader({ app: expressApp })
    LoggerInstance.info('Express loaded')
}