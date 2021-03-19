import { RouteOptions } from 'fastify'
import {
	register,
	confirm,
} from '../domains/user/controllers/register.controller'

export const registerUserRoute: RouteOptions = {
	method: 'POST',
	url: '/registration',
	handler: register,
}

export const confirmRegisterRoute: RouteOptions = {
	method: 'POST',
	url: '/registration/confirm',
	handler: confirm,
}
