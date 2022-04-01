import {Request, Response, Router} from 'express'
import defaultRoute from './modules/default/default.route'

const routes = Router()

routes.use('/', defaultRoute)

export default routes 