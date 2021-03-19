import { isEmpty } from 'lodash'

import { generateResult } from '../../../common/generators/result.generator'
import IRepositoryResponse from '../../../common/types/repoResponse.type'
import IResult from '../../../common/types/result.type'
import ReturnCodes from '../../../common/enums/returncode.enums'
import UserRepository from '../repositories/user/user.repository'

const userRepo = new UserRepository()

const registerUser = async (
	params: any,
): Promise<IResult> => {
	if (!params.data.firstname) {
		return generateResult(
			ReturnCodes.PRECONDITION_FAILED,
			'First name required',
		)
	}

	if (!params.data.lastname) {
		return generateResult(
			ReturnCodes.PRECONDITION_FAILED,
			'Last name required',
		)
	}

	if (!params.data.email) {
		return generateResult(
			ReturnCodes.PRECONDITION_FAILED,
			'Email required',
		)
	}

	if (!params.data.password) {
		return generateResult(
			ReturnCodes.PRECONDITION_FAILED,
			'Password required',
		)
	}

	const findByEmailRes: IRepositoryResponse = await userRepo.findByEmail(
		params.data.email,
	)

	if (findByEmailRes.err) {
		return generateResult(
			ReturnCodes.ERROR,
			'Error fetching record',
		)
	}

	if (!isEmpty(findByEmailRes.data)) {
		return generateResult(
			ReturnCodes.PRECONDITION_FAILED,
			'Email is already in use',
		)
	}

	const registerRes: IRepositoryResponse = await userRepo.register(
		params.data,
	)

	if (registerRes.err) {
		return generateResult(
			ReturnCodes.ERROR,
			'Error registering new user',
		)
	}

	return generateResult(
		ReturnCodes.CREATE_SUCCESS,
		'Successfully registered new user',
		registerRes.data,
	)
}

const verifyRegistration = async (
	email: string,
	password: string,
	verifyToken: string,
): Promise<IResult> => {
	const verifyRegRes: IRepositoryResponse = await userRepo.verifyReg(
		email,
		password,
		verifyToken,
	)

	if (verifyRegRes.err) {
		return generateResult(
			ReturnCodes.ERROR,
			'Error verifying registration',
		)
	}

	const generateJWTRes: IRepositoryResponse = await userRepo.generateJWT(
		verifyRegRes.data.id,
		verifyRegRes.data.email,
		verifyRegRes.data.restrictions,
	)

	if (generateJWTRes.err) {
		return generateResult(
			ReturnCodes.ERROR,
			'Error generating token',
		)
	}

	return generateResult(
		ReturnCodes.SUCCESS,
		'Registration verification successful',
		{
			token: generateJWTRes.data.token,
			expiry:
				generateJWTRes.data.expiry,
		},
	)
}

export {
	registerUser,
	verifyRegistration,
}
