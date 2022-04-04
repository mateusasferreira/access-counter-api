import { Document } from 'dynamoose/dist/Document'
import { Model } from 'dynamoose/dist/Model'
import { Repository } from './interfaces/IRepository'

export abstract class DynamodbRepository<T extends Document> implements Repository<T> {
	constructor(protected readonly collection: Model<T>){}

	async insert(item: Partial<T>): Promise<T> {
		return await this.collection.create(item)
	}

	async find(item: Partial<T> = {}): Promise<T[]> {
		const condition = {}

		for (const key of Object.keys(item)){
			condition[key] = {eq: item[key]}
		}

		return !Object.keys(condition).length
			? await this.collection.scan().exec()
			: await this.collection.query(condition).exec()
	}

	async findOne(itemOrId: string | Partial<T>): Promise<T> {
		if(typeof itemOrId === 'string') {
			return await this.collection.get(itemOrId)
		} 
		
		const condition = {}

		for (const key of Object.keys(itemOrId)){
			condition[key] = {eq: itemOrId[key]}
		}

		const res = await this.collection.query(condition).limit(1).exec()

		return res[0]
	}

	async update(id: string, item: Partial<T>): Promise<T> {
		return this.collection.update(id, item)
	}

	async delete(id: string): Promise<boolean> {
		await this.collection.delete(id)

		return true
	}
}
