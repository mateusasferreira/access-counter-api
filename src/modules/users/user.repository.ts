import { DynamodbRepository } from '../../base/repositories/dynamodbRepository'
import { User, userModel } from './user.model'

class UserRepository extends DynamodbRepository<User> {
	override async find(item: Partial<User> = {}): Promise<User[]> {
		const condition = {}

		for (const key of Object.keys(item)) {
			condition[key] = { eq: item[key] }
		}

		return !Object.keys(condition).length
			? await this.collection
				.scan()
				.attributes(['id', 'email', 'username', 'createdAt', 'updatedAt'])
				.exec()
			: await this.collection
				.query(condition)
				.attributes(['id', 'email', 'username', 'createdAt', 'updatedAt'])
				.exec()
	}
}

export default new UserRepository(userModel)
