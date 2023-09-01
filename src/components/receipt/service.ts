import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import fs from 'fs/promises'
import path from "path"
import config from "../../config";
import { IDocumentData } from "./interface";
import { Logger } from "winston";
import LoggerInstance from "../../loaders/logger";

export default class ReceiptService {
    private logger: Logger
    private axios: AxiosInstance
    private bsaleBaseUrl: string
    private bsaleAccessToken: string
    // private printer: ThermalPrinter

    constructor() {
        this.logger = LoggerInstance
        this.axios = axios
        this.bsaleBaseUrl = config.bsale.baseUrl
        this.bsaleAccessToken = config.bsale.accessToken
        // this.printer = PrinterInstance
    }

    async downloadPdf(resourceId: string) {
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
            this.logger.debug('File saved')
            return true
        } catch (error) {
            this.logger.error(error)
            return false
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