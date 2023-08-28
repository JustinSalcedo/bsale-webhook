import { Router, Request, Response, NextFunction } from "express"
import { IReceiptWebhookPayload } from "./interface"
import ReceiptService from './service'

const route = Router()

export default function (app: Router) {
    app.use('/receipt', route)

    route.post(
        '',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { resourceId } = req.body as IReceiptWebhookPayload
                const serviceInstance = new ReceiptService()
                const wasDownloaded = await serviceInstance.downloadPdf(resourceId)
                if (!wasDownloaded) return next(new Error('Could not download receipt'))
                return res.status(200).end()
            } catch (error) {
                return next(error)
            }
        }
    )
}