import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import counterController from './counter.controller'

const accessCounterRoutes = Router()

accessCounterRoutes.put(
	'/increment',
	asyncHandler(counterController.increment.bind(counterController))
)

accessCounterRoutes.get(
	'/',
	asyncHandler(counterController.get.bind(counterController))
)

export default accessCounterRoutes