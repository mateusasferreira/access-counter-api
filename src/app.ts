import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import routes from './routes'
import errorHandler from './middlewares/errorHandling/errorHandler.middleware'
import * as dynamoose from 'dynamoose'

dotenv.config()

process.env.IS_OFFLINE 
	? dynamoose.aws.ddb.local()
	: dynamoose.aws.sdk.config.update({})

const app = express()

app.use(express.json())
app.use(routes)
app.use(helmet())
app.use(cors({
	origin: '*'
}))

app.use(errorHandler)

export default app