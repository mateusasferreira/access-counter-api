import {Router} from 'express'
import asyncHandler from 'express-async-handler'
import userController from './user.controller'

const userRoutes = Router()

userRoutes.post('/', asyncHandler(userController.create.bind(userController)))
userRoutes.get('/', asyncHandler(userController.getAll.bind(userController)))
userRoutes.get('/:id', asyncHandler(userController.getOne.bind(userController)))

export default userRoutes