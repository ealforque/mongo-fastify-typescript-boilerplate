import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { IUser } from '../../models/user/user.type'
import config from '../../../../config/environment.config'
import IRepositoryResponse from '../../../../common/types/repoResponse.type'
import User from '../../models/user/user.model'
import UserInterface from './user.interface'

export default abstract class UserRepository
	implements UserInterface {
	constructor() {}

	public async findAll(): Promise<IRepositoryResponse> {
		let repoResponse: IRepositoryResponse = {
			err: null,
			data: null,
		}

		try {
			const users: IUser[] = await User.find()
			repoResponse.data = users
		} catch (error) {
			repoResponse.err = error
		}

		return repoResponse
	}

	public async store(
		data: any,
	): Promise<IRepositoryResponse> {
		let repoResponse: IRepositoryResponse = {
			err: null,
			data: null,
		}

		try {
			const user: IUser = new User(data)

			user.password = bcrypt.hashSync(
				user.password,
			)
			user.phone = {
				country: null,
				contactNo: null,
			}

			user.verifyToken = bcrypt.hashSync(
				`${user.email}_${user.password}`,
			)
			user.remembeToken = null
			user.verifiedAt = null
			user.active = true

			const newUser = await user.save()
			repoResponse.data = newUser
		} catch (error) {
			repoResponse.err = error
		}

		return repoResponse
	}

	public async findById(
		id: string,
	): Promise<IRepositoryResponse> {
		let repoResponse: IRepositoryResponse = {
			err: null,
			data: null,
		}

		try {
			const user: IUser | null = await User.findById(
				id,
			)
			repoResponse.data = user
		} catch (error) {
			repoResponse.err = error
		}

		return repoResponse
	}

	public async update(
		id: string,
		data: any,
	): Promise<IRepositoryResponse> {
		let repoResponse: IRepositoryResponse = {
			err: null,
			data: null,
		}

		try {
			const filter = { _id: id }

			const options = {
				new: true,
				upsert: false,
				useFindAndModify: false,
			}

			delete data.password

			const user = await User.findOneAndUpdate(
				filter,
				data,
				options,
			)
			repoResponse.data = user
		} catch (error) {
			repoResponse.err = error
		}

		return repoResponse
	}

	public async findByEmail(
		email: string,
	): Promise<IRepositoryResponse> {
		let repoResponse: IRepositoryResponse = {
			err: null,
			data: null,
		}

		try {
			const filter = { email: email }

			const user: IUser | null = await User.findOne(
				filter,
			)
			repoResponse.data = user
		} catch (error) {
			repoResponse.err = error
		}

		return repoResponse
	}

	public async generateJWT(
		id: string,
		email: string,
		restrictions: string[],
	): Promise<IRepositoryResponse> {
		let repoResponse: IRepositoryResponse = {
			err: null,
			data: null,
		}

		try {
			const token = jwt.sign(
				{
					id: id,
					email: email,
					restrictions: restrictions,
				},
				config.JWT_SECRET,
				{
					expiresIn: config.JWT_EXPIRY,
				},
			)
			repoResponse.data = {
				token: token,
				expiry: config.JWT_EXPIRY,
			}
		} catch (error) {
			repoResponse.err = error
		}

		return repoResponse
	}

	public async register(
		data: any,
	): Promise<IRepositoryResponse> {
		let repoResponse: IRepositoryResponse = {
			err: null,
			data: null,
		}

		try {
			const user: IUser = new User(data)

			user.password = bcrypt.hashSync(
				user.password,
			)
			user.phone = {
				country: null,
				contactNo: null,
			}
			user.restrictions = null
			user.verifyToken = bcrypt.hashSync(
				`${user.email}_${user.password}`,
			)
			user.remembeToken = null
			user.verifiedAt = null
			user.active = true

			const newUser = await user.save()
			repoResponse.data = newUser
		} catch (error) {
			repoResponse.err = error
		}

		return repoResponse
	}

	public async verifyReg(
		email: string,
		password: string,
		verifyToken: string,
	): Promise<IRepositoryResponse> {
		let repoResponse: IRepositoryResponse = {
			err: null,
			data: null,
		}

		try {
			const filter = {
				email: email,
			}

			let user: IUser | null = await User.findOne(
				filter,
			)

			console.log(
				bcrypt.compareSync(
					password,
					user.password,
				),
			)

			if (
				user &&
				bcrypt.compareSync(
					password,
					user.password,
				) &&
				user.verifyToken === verifyToken
			) {
				user.verifiedAt = new Date()

				user = await user.save()

				repoResponse.data = user
			} else {
				repoResponse.err = verifyToken
			}
		} catch (error) {
			repoResponse.err = error
		}

		return repoResponse
	}
}
