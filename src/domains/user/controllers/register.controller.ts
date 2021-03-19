import {
	FastifyRequest,
	FastifyReply,
} from 'fastify'

import {
	registerUser,
	verifyRegistration,
} from '../services/register.service'
import IResult from '../../../common/types/result.type'
import ReturnCodes from '../../../common/enums/returncode.enums'
import { IVerifyReg } from '../../../common/types/verifyreg.type'

const register = async (
	req: FastifyRequest,
	rep: FastifyReply,
) => {
	let params = {
		data: req.body,
	}

	const result: IResult = await registerUser(
		params,
	)
	rep
		.status(
			result.code < ReturnCodes.ERROR
				? ReturnCodes.SUCCESS
				: result.code,
		)
		.send({ ...result })
}

const confirm = async (
	req: FastifyRequest,
	rep: FastifyReply,
) => {
	
	const { email, password, token } = <
		IVerifyReg
	>req.body

	const result: IResult = await verifyRegistration(
		email || '',
		password || '',
		token || '',
	)

	rep
		.status(
			result.code < ReturnCodes.ERROR
				? ReturnCodes.SUCCESS
				: result.code,
		)
		.send({ ...result })
}

export { register, confirm }
