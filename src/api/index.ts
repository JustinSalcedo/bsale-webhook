import { Router } from 'express'
import receipt from '../components/receipt/route'

export default function () {
    const app = Router()
    receipt(app)
    return app
}