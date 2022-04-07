import { Request, Response } from 'express'
import counterService, { ICounterService } from './counter.service'

class CounterController {
	constructor(private readonly counterService: ICounterService){}

	async increment(req: Request, res: Response){
		const result = await this.counterService.increase()
		
		res.status(200).json(result)
	}
	
	async get(req: Request, res: Response){
		const result = await this.counterService.get()
		
		res.status(200).json(result)
	}
}

export default new CounterController(counterService)