import { authRoute } from './routes/auth.route'
import {
	confirmRegisterRoute,
	registerUserRoute,
} from './routes/register.route'
import {
	getUsersRoute,
	addUserRoute,
	getUserRoute,
	updateUserRoute,
} from './routes/user.route'

const routes = [
	authRoute,
	getUsersRoute,
	addUserRoute,
	getUserRoute,
	updateUserRoute,
	registerUserRoute,
	confirmRegisterRoute,
]

export default routes
