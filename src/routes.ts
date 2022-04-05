import {Router} from 'express'
import defaultRoute from './modules/default/default.route'
import userRoutes from './modules/users/user.router'

const routes = Router()

routes.use('/', defaultRoute)
routes.use('/users', userRoutes)

export default routes 