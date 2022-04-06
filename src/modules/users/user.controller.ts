import { Request, Response } from 'express'
import userService, { IUserService } from './user.service'

class UserController {
	constructor(private readonly userService: IUserService){}

	async create(req: Request, res: Response){
		const {email, password, username} = req.body

		if(!email || !password || !username) {
			res.status(400)
			throw new Error('email, password and username fields are required')
		}

		const user = await this.userService.create({email, password, username})

		res.status(201).json(user)
	}

	async getOne(req: Request, res: Response){
		const {id} = req.params

		const user = await this.userService.get(id)

		if(!user) {
			res.status(404)
			throw new Error('No user found') 
		}

		res.status(200).json(user)
	}

	async getAll(req: Request, res: Response){
		const users = await this.userService.getAll()

		res.status(200).json(users)
	}
}

export default new UserController(userService)