import app from '../../src/app'
import supertest from 'supertest'

import userRepository from '../../src/modules/users/user.repository'
import { User } from '../../src/modules/users/user.model'
import { PinpointEmail } from 'aws-sdk'

jest.mock('dynamoose')
jest.mock('aws-sdk')
jest.mock('../../src/modules/users/user.repository')

const mockedRepository = userRepository as jest.Mocked<typeof userRepository>

let mockUser
let mockPartialUser

beforeAll(() => {
  jest.clearAllMocks()

  mockUser = {
    username: 'user',
    password: '12345',
    email: 'user@email.com.br'
  }

  mockPartialUser = {
    username: 'user',
    password: '12345',
  }
})

describe('user endpoints', () => {
  it('/POST should respond 400 if required fields in the body are missing', async () => {
    mockedRepository.insert.mockImplementation((user: Partial<User>) => Promise.resolve(user as User))
    mockedRepository.findOne.mockResolvedValue(null)

    const res = await supertest(app)
      .post('/users')
      .send(mockPartialUser)

    expect(res.status).toBe(400)
  })
  
  it('/POST should respond 400 if email is already used', async () => {
    mockedRepository.insert.mockImplementation((user: Partial<User>) => Promise.resolve(user as User))
    mockedRepository.findOne.mockResolvedValueOnce({email: mockUser.email} as User)
    mockedRepository.findOne.mockResolvedValueOnce(null as User)

    const res = await supertest(app)
      .post('/users')
      .send(mockUser)

    expect(res.status).toBe(400)
  })
  
  it('/POST should respond 400 if username is already used', async () => {
    mockedRepository.insert.mockImplementation((user: Partial<User>) => Promise.resolve(user as User))
    mockedRepository.findOne.mockResolvedValueOnce({username: mockUser.username} as User)
    mockedRepository.findOne.mockResolvedValueOnce(null as User)

    const res = await supertest(app)
      .post('/users')
      .send(mockUser)
    
    expect(res.status).toBe(400)
  })
  
  it('/POST should respond 201 if the right body data is passed', async () => {
    mockedRepository.insert.mockImplementation((user: Partial<User>) => Promise.resolve(user as User))
    mockedRepository.findOne.mockResolvedValue(null)

    const res = await supertest(app)
      .post('/users')
      .send(mockUser)

    expect(res.status).toBe(201)
  })

  it('/GET should respond 404 if resource doesnt exists', async () => {
    mockedRepository.findOne.mockResolvedValue('' as unknown as User)

    const res = await supertest(app)
      .get('/users/1')
    
    expect(res.status).toBe(404)
  })

  it('/GET should respond 200 if resource exists', async () => {
    mockedRepository.findOne.mockResolvedValue(mockUser)

    const res = await supertest(app)
      .get('/users/1')
    
    expect(res.status).toBe(200)
  })
})