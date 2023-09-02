import { Logger } from "winston";
import LoggerInstance from "./logger";
import { Printer, getDefaultPrinter, getPrinters, print, PrintOptions } from "pdf-to-printer";
import config from "../config";

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