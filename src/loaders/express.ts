import { Express, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { json } from 'express'
import routes from '../api'
import config from '../config'

export default function ({ app }: { app: Express }) {
    app.get('/status', (req, res) => {
        res.status(200).end()
    })

    app.head('/status', (req, res) => {
        res.status(200).end()
    })

    app.enable('trust proxy')

    app.use(cors())

    app.use(require('method-override')())

    app.use(json())

    app.use(config.api.prefix, routes())

    // Authorization

    // app.use((req: Request, res: Response, next: NextFunction) => {
    //     const { userid: userId } = req.headers
    //     if (userId !== config.userId) return res.status(403).send({ message: 'Forbidden' }).end()
    //     next()
    // })

    // Error handling

    app.use((req, res, next) => {
        const err: Error & { status?: number } = new Error('Not Found')
        err['status'] = 404
        next(err)
    })

    app.use((err: Error & { status?: number }, req: Request, res: Response, next: NextFunction) => {
        if (err.name === 'UnauthorizedError') {
            return res
                .status(err.status || 401)
                .send({ message: err.message })
                .end()
        }
        return next(err)
    })

    app.use((err: Error & { status?: number }, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500)
        res.json({
            errors: {
                message: err.message
            }
        })
    })
}