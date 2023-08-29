import { createServer } from 'http'

import config from './config'

import express from 'express'

import LoggerInstance from './loaders/logger'

async function startServer() {
    const { port, debugNamespace } = config

    const app = express()

    const server = createServer(app)

    await require('./loaders').default({ expressApp: app })

    server.listen(port)

    server.on('error', onError)
    server.on('listening', onListening)


    /* Event listener for HTTP server "error" event. */

    function onError(error: Error & { syscall: string, code: string }) {
        if (error.syscall !== 'listen') {
            throw error
        }

        let bind = ''
        if (typeof port === 'string') {
            bind = `Pipe ${port}`
        } else {
            bind = `Port ${port}`
        }

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                LoggerInstance.error(bind + " requires elevated privileges")
                process.exit(1)
            case "EADDRINUSE":
                LoggerInstance.error(bind + " is already in use")
                process.exit(1)
            default:
                LoggerInstance.error(error)
        }
    }

    /* Event listener for HTTP server "listening" event. */

    function onListening() {
        const address = server.address()
        let bind = ''
        if (typeof address === 'string') {
            bind = `pipe ${address}`
        } else {
            bind = `port ${address}`
        }

        if (process.env.NODE_ENV === 'development') {
            require('debug')(debugNamespace)(`Listening on ${address}`)
            LoggerInstance.info(`Server listening on port: ${port}`)
        }
    }
}

startServer()