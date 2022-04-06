import { Repository } from '../../base/repositories/interfaces/IRepository'
import { User } from './user.model'
import userRepository from './user.repository'
import { CreateUserDto} from './dtos/createUser.dto'
import bcrypt from 'bcrypt'
import { Response } from 'express'

export interface IUserService {
  create(user: CreateUserDto): Promise<User>
  get(id: string): Promise<User>
	getAll(): Promise<User[]>
}

export class UserService implements IUserService {

	constructor(private readonly repository: Repository<User>){}

	async create(user: CreateUserDto): Promise<User> {
		const emailAlreadyUsed = await this.repository.findOne({email: user.email})
		
		if(emailAlreadyUsed) throw new Error('Email already registered')
		
		const usernameAlreadyUsed = await this.repository.findOne({username: user.username})
		
		if(usernameAlreadyUsed) throw new Error('Username already registered')
		
		const passwordMatch = user.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)

		if(!passwordMatch) throw new Error('Senha deve ter ao menos 8 caracteres, sendo pelo menos um miúsculo e uma letra')

		const encryptedPassword = await bcrypt.hash(user.password, 8)

		delete user.password

		return await this.repository.insert({
			email: user.email,
			passwordHash: encryptedPassword,
			username: user.username
		})
	}

	async get(id: string): Promise<User> {
		const res = await this.repository.findOne(id)  

		if(res) delete res.passwordHash

		return res
	}

	async getAll(): Promise<User[]>{
		return await this.repository.find()
	}
}

export default new UserService(userRepository)