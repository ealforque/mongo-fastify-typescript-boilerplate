import {
	FastifyRequest,
	FastifyReply,
} from 'fastify'

import {
	getAllRecords,
	addNewRecord,
	getRecordById,
	updateRecord,
} from '../services/user.service'
import IResult from '../../../common/types/result.type'
import ReturnCodes from '../../../common/enums/returncode.enums'
import { IIDParameter } from '../../../common/types/idparam.type'

const index = async (
	req: FastifyRequest,
	rep: FastifyReply,
): Promise<void> => {
	const result: IResult = await getAllRecords()
	rep
		.status(
			result.code < ReturnCodes.ERROR
				? ReturnCodes.SUCCESS
				: result.code,
		)
		.send({ ...result })
}

const addUser = async (
	req: FastifyRequest,
	rep: FastifyReply,
): Promise<void> => {
	let params = {
		data: req.body,
	}

	const result: IResult = await addNewRecord(
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

const getUser = async (
	req: FastifyRequest,
	rep: FastifyReply,
): Promise<void> => {
	const { id } = <IIDParameter>(
		req.params
	)

	const params = {
		id: id,
	}
	const result: IResult = await getRecordById(
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

const updateUser = async (
	req: FastifyRequest,
	rep: FastifyReply,
): Promise<void> => {
	const { id } = <IIDParameter>(
		req.params
	)

	let params = {
		id: id,
		data: req.body,
	}
	const result: IResult = await updateRecord(
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

export {
	index,
	addUser,
	getUser,
	updateUser,
}
