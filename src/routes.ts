import {Router} from 'express'
import accessCounterRoutes from './modules/access-counter/counter.router'
import defaultRoute from './modules/default/default.route'
import userRoutes from './modules/users/user.router'

const routes = Router()

routes.use('/', defaultRoute)
routes.use('/users', userRoutes)
routes.use('/access-count', accessCounterRoutes)

export default routes 