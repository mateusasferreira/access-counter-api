import { User } from '../user.model'
import {IUserService, UserService} from '../user.service'
import {CreateUserDto} from '../dtos/createUser.dto'
import bcrypt from 'bcrypt'
import userRepository from '../user.repository'
import { Response } from 'express'

jest.mock('dynamoose')
jest.mock('aws-sdk')
jest.mock('../user.repository')

const mockedRepository = userRepository as jest.Mocked<typeof userRepository>

let userService: IUserService
let mockUser: CreateUserDto

beforeAll(() => {
  userService = new UserService(userRepository)

  mockUser = {
    username: 'user',
    password: '12345',
    email: 'user@email.com.br'
  }
})

describe('user service', () => {
  it('should create user with encrypted password', async () => {
    mockedRepository.insert.mockImplementation(async (user: Partial<User>) => Promise.resolve(user as User))
    
    const password = mockUser.password
    
    const user = await userService.create(mockUser)

    const decryptedPassword = await bcrypt.compare(password, user.passwordHash)

    expect(decryptedPassword).toBe(true)
  })

  it('should retrieve user', async () => {
    const id = '1'
    
    mockedRepository.findOne.mockResolvedValue({id} as User)
    
    await userService.get(id)

    expect(mockedRepository.findOne).toBeCalledWith(id)
  })
})