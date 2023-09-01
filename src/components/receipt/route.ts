import { Router, Request, Response, NextFunction } from "express"
import { IReceiptWebhookPayload } from "./interface"
import ReceiptService from './service'

const route = Router()

export default function (app: Router) {
    app.use('/receipt', route)

    // route.get(
    //     '',
    //     async (req: Request, res: Response, next: NextFunction) => {
    //         try {
    //             const serviceInstance = new ReceiptService()
    //             const wasPrinted = await serviceInstance.printSampleReceipt()
    //             if (!wasPrinted) return next(new Error('Could not print sample receipt'))
    //             return res.status(200).end()
    //         } catch (error) {
    //             return next(error)
    //         }
    //     }
    // )

    // route.post(
    //     '/print',
    //     async (req: Request, res: Response, next: NextFunction) => {
    //         try {
    //             const { text }: { text: string | undefined } = req.body
    //             if (!text) return next(new Error('Cannot print blank text'))
    //             const serviceInstance = new ReceiptService()
    //             const wasPrinted = await serviceInstance.printCustomText(text)
    //             if (!wasPrinted) return next(new Error('Could not print custom text'))
    //             return res.status(200).end()
    //         } catch (error) {
    //             return next(error)
    //         }
    //     }
    // )

    route.post(
        '',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { resourceId, topic } = req.body as IReceiptWebhookPayload
                if (!(resourceId && topic)) return res.status(400).json({ error: "Missing resourceId or topic" })
                if (topic !== 'document') return res.status(400).json({ error: "Invalid topic (resource must be a document)" })
                const serviceInstance = new ReceiptService()
                const wasPrinted = await serviceInstance.printReceipt(resourceId)
                if (!wasPrinted) return next(new Error('Could not print receipt'))
                return res.status(200).end()
            } catch (error) {
                return next(error)
            }
        }
    )
}