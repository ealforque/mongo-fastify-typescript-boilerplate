import * as fastify from 'fastify'
import swagger from 'fastify-swagger'
import mongoose from 'mongoose'

import config from './config/environment.config'
import swaggerOpts from './config/swagger.config'
import routes from './routes'
import _ from 'lodash'

const mongoDBURI = `mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DB}`
const mongoDBOpts = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}

const app = fastify.default({
	logger: true,
})

app.register(swagger, swaggerOpts)

routes.forEach((route) => {
	app.route(route)
})

mongoose
	.connect(mongoDBURI, mongoDBOpts)
	.then(
		async (): Promise<void> => {
			try {
				await app.listen(
					config.SERVER_PORT,
				)
				app.swagger()
			} catch (err) {
				app.log.error(err)
				process.exit(1)
			}
		},
	)
	.catch((error) => {
		throw error
	})

export default app
