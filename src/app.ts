import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import routes from './routes'

dotenv.config()

const app = express()

app.use(express.json())
app.use(routes)
app.use(helmet())
app.use(cors({
	origin: '*'
}))

export default app