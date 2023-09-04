import { Logger } from "winston";
import LoggerInstance from "./logger";
import { Printer, getDefaultPrinter, getPrinters, print, PrintOptions } from "pdf-to-printer";
//@ts-ignore
import pdfPoppler from 'pdf-poppler'

import config from "../config";
import path from "path";

export class PrinterHandler {
    private logger: Logger

    constructor() {
        this.logger = LoggerInstance
    }

    private logPrinterDetails({ deviceId, name, paperSizes }: Printer) {
        this.logger.info(`
        Device ID: ${deviceId}
        \n- Name: ${name}
        \n- Paper sizes: ${paperSizes}
    `)
    }

    public async logAllPrintersDetails() {
        try {
            const printers = await getPrinters()
            printers.map((printer) => this.logPrinterDetails(printer))
        } catch (error) {
            this.logger.error(error)
        }
    }

    public async printPDF(pdfFilePath: string) {
        try {
            await print(pdfFilePath, { printer: config.printer.name, paperSize: "Roll Paper 58 x 297 mm" })
            return true
        } catch (error) {
            this.logger.error(error)
            return false
        }
    }

    public async printPDFAsImage(pdfFilePath: string) {
        try {
            // convert PDF to JPG
            const imageFileDir = path.join(__dirname, `../../../documents/receipts`)
            const opts = {
                format: 'jpeg',
                out_dir: imageFileDir,
                out_prefix: 'receipt',
                page: null
            }
            await pdfPoppler.conver(pdfFilePath, opts)
            return true

            // print JPG

            // delete JPG
        } catch (error) {
            this.logger.error(error)
            return false
        }
    }

    public async checkOSCompatibility() {
        try {
            await getDefaultPrinter()
            return true
        } catch (error) {
            return false
        }
    }
}

const PrinterHandlerInstance = new PrinterHandler()
export default PrinterHandlerInstance