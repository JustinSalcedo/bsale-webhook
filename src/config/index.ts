import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()
if (envFound.error) {
    throw new Error("Couldn't file .env file")
}

export default {
    port: parseInt(process.env.PORT as string, 10),
    // databaseURL: process.env.MONGODB_URI,
    debugNamespace: process.env.DEBUG_NAMESPACE,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: '/v1'
    },
    // app: {
    //     prefix: '/app'
    // }
    bsale: {
        baseUrl: process.env.BSALE_BASE_URL || '',
        accessToken: process.env.BSALE_ACCESS_TOKEN || ''
    },
    printer: {
        interface: process.env.PRINTER_INTERFACE || '\\.\COM1'
    }
}