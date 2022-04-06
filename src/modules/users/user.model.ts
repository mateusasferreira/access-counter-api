import { Document } from 'dynamoose/dist/Document'
import * as dynamoose from 'dynamoose'
import { v4 as uuid } from 'uuid'
import { Model } from 'dynamoose/dist/Model'

class User extends Document {
	id: string
	email: string
	username: string
	passwordHash?: string
	createdAt: string
	updatedAt: string
}

const userModel: Model<User> = dynamoose.model<User>(
	process.env.DYNAMODB_USERS_TABLE_NAME,
	new dynamoose.Schema(
		{
			id: {
				type: String,
				hashKey: true,
				default: uuid(),
			},
			email: {
				type: String,
				required: true,
				validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
				index: {
					name: 'emailIndex',
					global: true,
				},
			},
			username: {
				type: String,
				required: true,
				index: {
					name: 'usernameIndex',
					global: true,
				},
			},
			passwordHash: {
				type: String,
				required: true,
			},
		},
		{
			timestamps: true,
		}
	),
	{create: false}
)

export { User, userModel }
