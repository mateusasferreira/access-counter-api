import { Request, Response, NextFunction} from 'express'
import errorHandler from './errorHandler.middleware'

let mockRequest: Partial<Request>
let mockResponse: Partial<Response>
let nextFunction: NextFunction = jest.fn()
let error: {msg?: string} = {}

beforeEach(() => {
    mockRequest = {
      
    } as Request
    mockResponse = {
      status: jest.fn().mockImplementation(() => {
        return {
          json: jest.fn()
        }
      }),
    }

    jest.clearAllMocks()
})

describe('error handling middleware', () => {
  it('should respond with provided status code', () => {
    mockResponse.statusCode = 400

    error.msg = 'error'

    errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction)
    
    expect(mockResponse.status).toBeCalledWith(400)
  })
  
  it('should respond 500 if no status code is provided', () => {
    mockResponse.statusCode = undefined

    error.msg = 'error'

    errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction)
    
    expect(mockResponse.status).toBeCalledWith(500)
  })
})