import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import fs from 'fs/promises'
import path from "path"
import config from "../../config";
import { IDocumentData } from "./interface";
import { Logger } from "winston";
import LoggerInstance from "../../loaders/logger";
import PrinterHandlerInstance, { PrinterHandler } from "../../loaders/printer";

export default class ReceiptService {
    private logger: Logger
    private axios: AxiosInstance
    private bsaleBaseUrl: string
    private bsaleAccessToken: string
    private printer: PrinterHandler

    constructor() {
        this.logger = LoggerInstance
        this.axios = axios
        this.bsaleBaseUrl = config.bsale.baseUrl
        this.bsaleAccessToken = config.bsale.accessToken
        this.printer = PrinterHandlerInstance
    }

    public async printReceipt(resourceId: string) {
        try {
            const isOSCompatible = await this.printer.checkOSCompatibility()
            if (!isOSCompatible) throw new Error("Printer handler doesn't support this OS")
            const pdfFileName = await this.downloadPdf(resourceId)
            const pdfFilePath = path.join(__dirname, `../../../documents/receipts/${pdfFileName}`)
            // const wasPrinted = await this.printer.printPDF(pdfFilePath)
            const wasPrinted = await this.printer.printPDFAsImage(pdfFilePath)
            if (wasPrinted) {
                this.logger.info('Receipt printed!')
                this.deleteFile(pdfFilePath)
            }
            else this.logger.error('Could not print receipt')
            return wasPrinted
        } catch (error) {
            this.logger.error(error)
            return false
        }
    }

    private async downloadPdf(resourceId: string) {
        try {
            const requestConfig: AxiosRequestConfig = {
                url: `/v1/documents/${resourceId}.json`,
                method: 'GET',
                baseURL: this.bsaleBaseUrl,
                headers: {
                    'access_token': this.bsaleAccessToken
                }
            }

            const response = await this.axios(requestConfig)
            const { urlPdfOriginal } = response.data as IDocumentData

            const pdfRequestConfig: AxiosRequestConfig = {
                url: urlPdfOriginal,
                method: 'GET',
                responseType: "arraybuffer"
            }
            const pdfResponse = await this.axios(pdfRequestConfig)
            const splitPdfUrl = urlPdfOriginal.split('/')
            const fileName = splitPdfUrl[splitPdfUrl.length - 1]
            const fileData = Buffer.from(pdfResponse.data, 'binary')
            await fs.writeFile(path.join(__dirname, `../../../documents/receipts/${fileName}`), fileData)
            this.logger.info('File saved')
            return fileName
        } catch (error) {
            this.logger.error(error)
            return null
        }
    }

    private async deleteFile(filePath: string) {
        try {
            await fs.unlink(filePath)
        } catch (error) {
            this.logger.error(error)
        }
    }

    // async printSampleReceipt() {
    //     try {
    //         const isConnected = await this.printer.isPrinterConnected()
    //         if (!isConnected) {
    //             this.logger.error('Printer is not connected')
    //             return false
    //         }

    //         this.printer.alignCenter()
    //         this.printer.println("Hello pals!")
    //         this.printer.cut()

    //         await this.printer.execute()
    //         this.logger.debug('Print done!')
    //         return true
    //     } catch (error) {
    //         this.logger.error('Printing failed')
    //         return false
    //     }
    // }

    // async printCustomText(text: string) {
    //     try {
    //         const isConnected = await this.printer.isPrinterConnected()
    //         if (!isConnected) {
    //             this.logger.error('Printer is not connected')
    //             return false
    //         }

    //         this.printer.print(text)
    //         this.printer.cut()

    //         await this.printer.execute()
    //         this.logger.debug(`Printed: "${text}"`)
    //         return true
    //     } catch (error) {
    //         this.logger.error('Printing failed')
    //         return false
    //     }
    // }
}