import moment from 'moment'
import IResult from './../types/result.type'

export const generateResult = (
	code: number,
	msge: string,
	data?: any,
): IResult => {
	let result: IResult = {
		code: code,
		msge: msge,
		time: `${moment().unix().valueOf()}`,
	}

	if (data) {
		result.data = data
	}

	return result
}
