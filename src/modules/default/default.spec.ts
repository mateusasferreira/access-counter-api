import {helloWorld} from './default'

describe('hello world function', () => {
  it('should return hello world', () => {
    const msg = helloWorld()

    expect(msg).toBe('hello world')
  })
})