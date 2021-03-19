import IRepositoryResponse from '../../../../common/types/repoResponse.type'

export default interface IUserRepository {
	findAll(): Promise<IRepositoryResponse>

	store(data: any): Promise<IRepositoryResponse>

	findById(
		id: string,
	): Promise<IRepositoryResponse>

	update(
		id: string,
		data: any,
	): Promise<IRepositoryResponse>

	findByEmail(
		email: string,
	): Promise<IRepositoryResponse>

	generateJWT(
		id: string,
		email: string,
		restrictions: string[],
	): Promise<IRepositoryResponse>

	register(
		data: any,
	): Promise<IRepositoryResponse>

	verifyReg(
		email: string,
		password: string,
		token: string,
	): Promise<IRepositoryResponse>
}
