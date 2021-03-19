import { Document } from 'mongoose'

export interface IUser
	extends Document {
	firstname: string
	lastname: string
	phone: {
		country: string | null
		contactNo: string | null
	}
	email: string
	password: string
	restrictions: string[] | null
	verifyToken: string | null
	remembeToken: string | null
	verifiedAt: Date | null
	active: boolean
}
