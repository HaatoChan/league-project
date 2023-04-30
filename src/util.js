import * as dotenv from 'dotenv'
dotenv.config()

console.log(process.env.TEST)
export const isTest = process.env.TEST === 'true'