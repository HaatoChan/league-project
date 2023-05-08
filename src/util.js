import * as dotenv from 'dotenv'
dotenv.config()

export const isTest = process.env.TEST === 'true'