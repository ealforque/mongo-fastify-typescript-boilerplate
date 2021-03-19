import {
	FastifyRequest,
	FastifyReply,
} from 'fastify'

import { authenticate } from '../services/auth.service'
import { ICredentials } from '../../../common/types/credentials.type'
import IResult from '../../../common/types/result.type'
import ReturnCodes from '../../../common/enums/returncode.enums'

const login = async (
	req: FastifyRequest,
	rep: FastifyReply,
): Promise<void> => {
	const { email, password } = <
		ICredentials
	>req.body

	const credentials: ICredentials = {
		email: email || '',
		password: password || '',
	}

	const result: IResult = await authenticate(
		credentials,
	)

	rep
		.status(
			result.code < ReturnCodes.ERROR
				? ReturnCodes.SUCCESS
				: result.code,
		)
		.send({ ...result })
}

export { login }
