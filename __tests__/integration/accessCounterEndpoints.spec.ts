import supertest from "supertest"
import app from '../../src/app'
import axios from 'axios'

jest.mock('axios')
jest.mock('aws-sdk')
jest.mock('dynamoose')

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('access counter endpoints', () => {
  it('/PUT should respond 200 with new count number',  async () => {
    const axiosRes = {data: {value: 1}}

    mockedAxios.get.mockResolvedValue(axiosRes)
    
    const res = await supertest(app)
      .put('/access-count/increment')
    
    expect(res.status).toBe(200)
    expect(res.body.accessCount).toBe(1)
  })

  it('/GET should respond 200 with count number', async  () => {
    const axiosRes = {data: {value: 1}}

    mockedAxios.get.mockResolvedValue(axiosRes)
    
    const res = await supertest(app)
      .get('/access-count')
    
    expect(res.status).toBe(200)
    expect(res.body.accessCount).toBe(1)
  })
})