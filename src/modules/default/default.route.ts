import {Request, Response, Router} from 'express'
import { helloWorld } from './default'

const defaultRoute = Router()

defaultRoute.get('/', (req: Request, res: Response) => {
	res.status(200).json({message: helloWorld()})
})

export default defaultRoute