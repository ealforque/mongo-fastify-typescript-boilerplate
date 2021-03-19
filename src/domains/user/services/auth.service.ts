import { isEmpty } from 'lodash'
import bcrypt from 'bcryptjs'

import { generateResult } from '../../../common/generators/result.generator'
import config from '../../../config/environment.config'
import { ICredentials } from '../../../common/types/credentials.type'
import IRepositoryResponse from '../../../common/types/repoResponse.type'
import IResult from '../../../common/types/result.type'
import ReturnCodes from '../../../common/enums/returncode.enums'
import UserRepository from '../repositories/user/user.repository'

const userRepo = new UserRepository()

const authenticate = async (
	credentials: ICredentials,
): Promise<IResult> => {
	let { email, password } = credentials

	if (!(email && password)) {
		return generateResult(
			ReturnCodes.BAD_REQUEST,
			'Email and password required',
		)
	}

	const findByEmailRes: IRepositoryResponse = await userRepo.findByEmail(
		email,
	)

	if (findByEmailRes.err) {
		return generateResult(
			ReturnCodes.ERROR,
			'Error fetching record',
		)
	}

	if (
		isEmpty(findByEmailRes.data) ||
		!bcrypt.compareSync(
			password,
			findByEmailRes.data?.password,
		)
	) {
		return generateResult(
			ReturnCodes.BAD_REQUEST,
			'Incorrect credentials',
		)
	}

	if (
		findByEmailRes.data.verifiedAt ===
		null
	) {
		return generateResult(
			ReturnCodes.PRECONDITION_FAILED,
			'Unable to authenticate. Email unverified',
		)
	}

	const generateJWTRes: IRepositoryResponse = await userRepo.generateJWT(
		findByEmailRes.data.id,
		findByEmailRes.data.email,
		findByEmailRes.data.restrictions,
	)

	if (generateJWTRes.err) {
		return generateResult(
			ReturnCodes.ERROR,
			'Error generating token',
		)
	}

	return generateResult(
		ReturnCodes.SUCCESS,
		'Authentication successful',
		{
			[config.JWT_HEADER]:
				generateJWTRes.data.token,
			expiry:
				generateJWTRes.data.expiry,
		},
	)
}

export { authenticate }
