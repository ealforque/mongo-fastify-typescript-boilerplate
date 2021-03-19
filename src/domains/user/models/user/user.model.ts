import { model, Schema } from 'mongoose'

import { IUser } from './user.type'

const userSchema: Schema = new Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		phone: {
			country: {
				type: String || null,
				required: false,
			},
			contactNo: {
				type: String || null,
				required: false,
			},
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		restrictions: {
			type: [String],
			required: false,
		},
		verifyToken: {
			type: String || null,
			required: false,
		},
		remembeToken: {
			type: String || null,
			required: false,
		},
		verifiedAt: {
			type: Date || null,
			required: false,
		},
		active: {
			type: Boolean,
			required: true,
		},
	},
	{ timestamps: true },
)

export default model<IUser>(
	'User',
	userSchema,
)
