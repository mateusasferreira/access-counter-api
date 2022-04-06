import axios from 'axios'
import { Counter } from './counter.model'

export interface ICounterService {
  increase(): Promise<Counter>
  get(): Promise<Counter>
}

class CounterService implements ICounterService {
	async increase(): Promise<Counter>{
		const {data} = await axios.get<{value: number}>('https://api.countapi.xyz/hit/ton.com/visits') 

		return {
			accessCount: data.value
		}
	}

	async get(): Promise<Counter>{
		const {data} = await axios.get<{value: number}>('https://api.countapi.xyz/get/ton.com/visits') 

		return {
			accessCount: data.value
		}
	}
}

export default new CounterService()