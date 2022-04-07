import axios from 'axios'
import counterService from '../counter.service'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('counter service', () => {
  it('should increment access count and return the new count number', async () => {
    const res = {data: {value: 1}}

    mockedAxios.get.mockResolvedValue(res)

    const count = await counterService.increase()

    expect(count.accessCount).toBe(res.data.value)
  })
  
  it('should return the new count number', async () => {
    const res = {data: {value: 1}}

    mockedAxios.get.mockResolvedValue(res)

    const count = await counterService.get()

    expect(count.accessCount).toBe(res.data.value)
  })
})