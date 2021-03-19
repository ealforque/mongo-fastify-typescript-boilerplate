import { isEmpty } from 'lodash'

import { generateResult } from '../../../common/generators/result.generator'
import UserRepository from '../repositories/user/user.repository'
import IResult from '../../../common/types/result.type'
import IRepositoryResponse from '../../../common/types/repoResponse.type'
import ReturnCodes from '../../../common/enums/returncode.enums'

const userRepo = new UserRepository()

const getAllRecords = async (): Promise<IResult> => {
	const {
		err,
		data,
	}: IRepositoryResponse = await userRepo.findAll()

	if (err) {
		return generateResult(
			ReturnCodes.ERROR,
			'Error fetching records',
		)
	}

	if (isEmpty(data)) {
		return generateResult(
			ReturnCodes.NO_RECORDS_FOUND,
			'No records found',
		)
	}

	return generateResult(
		ReturnCodes.READ_SUCCESS,
		'Successfully fetched records',
		data,
	)
}

const addNewRecord = async (
	params: any,
): Promise<IResult> => {
	const {
		err,
		data,
	}: IRepositoryResponse = await userRepo.store(
		params.data,
	)

	if (err) {
		return generateResult(
			ReturnCodes.ERROR,
			'Error adding new record',
		)
	}

	return generateResult(
		ReturnCodes.CREATE_SUCCESS,
		'Successfully added new record',
		data,
	)
}

const getRecordById = async (
	params: any,
): Promise<IResult> => {
	const {
		err,
		data,
	}: IRepositoryResponse = await userRepo.findById(
		params.id,
	)

	if (err) {
		return generateResult(
			ReturnCodes.ERROR,
			'Error fetching record',
		)
	}

	if (isEmpty(data)) {
		return generateResult(
			ReturnCodes.NO_RECORDS_FOUND,
			'No record found',
		)
	}

	return generateResult(
		ReturnCodes.READ_SUCCESS,
		'Successfully fetched record',
		data,
	)
}

const updateRecord = async (
	params: any,
): Promise<IResult> => {
	const {
		err,
		data,
	}: IRepositoryResponse = await userRepo.update(
		params.id,
		params.data,
	)

	if (err) {
		return generateResult(
			ReturnCodes.ERROR,
			'Error updating record',
		)
	}

	if (isEmpty(data)) {
		return generateResult(
			ReturnCodes.NO_RECORDS_FOUND,
			'No record found',
		)
	}

	return generateResult(
		ReturnCodes.UPDATE_SUCCESS,
		'Successfully updated record',
		data,
	)
}

export {
	getAllRecords,
	addNewRecord,
	getRecordById,
	updateRecord,
}
