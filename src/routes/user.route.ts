import { RouteOptions } from 'fastify'
import {
	index,
	addUser,
	getUser,
	updateUser,
} from '../domains/user/controllers/user.controller'

export const getUsersRoute: RouteOptions = {
	method: 'GET',
	url: '/users',
	handler: index,
}

export const addUserRoute: RouteOptions = {
	method: 'POST',
	url: '/users/add',
	handler: addUser,
}

export const getUserRoute: RouteOptions = {
	method: 'GET',
	url: '/users/:id',
	handler: getUser,
}

export const updateUserRoute: RouteOptions = {
	method: 'POST',
	url: '/users/update/:id',
	handler: updateUser,
}
