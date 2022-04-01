import {Request, Response, Router} from 'express'

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
	res.sendStatus(200)
})

export default routes 