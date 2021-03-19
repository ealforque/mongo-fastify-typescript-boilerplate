import { RouteOptions } from 'fastify'
import { login } from '../domains/user/controllers/auth.controller'

export const authRoute: RouteOptions = {
	method: 'POST',
	url: '/auth/login',
	handler: login,
}
