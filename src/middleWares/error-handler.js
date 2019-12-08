import Log from 'colorprint'
import MongooseError from 'mongoose/lib/error'
import config from 'config'
import AppError from '../utils/app-error'
import AppResponse from '../utils/app-response'

// @ts-ignore
// eslint-disable-next-line no-unused-vars
export default (error, req, res, next) => {
	const meta = {}
	if (error instanceof MongooseError) {
		const code = 503
		meta.status_code = code
		meta.error = { code, message: 'Some server problems, please try again' }
		meta.developer_message = error
	} else if (error instanceof AppError) {
		const err = error.format()
		const { code } = err
		meta.status_code = code
		meta.error = { code, message: err.message }
		if (err.messages) {
			meta.error.messages = err.messages
		}
		if (err.type) {
			meta.error.type = err.type
		}
	} else {
		Log.notice('Here i am now AppError=====>>>>>', error instanceof AppError)
		const code = 500
		meta.status_code = code
		meta.error = {
			code,
			message: 'A problem with our server, please try again'
		}
		meta.developer_message = error
	}
	if (`${config.util.getEnv('NODE_ENV')}` !== 'production') {
		Log.error('error>>>>>>>>>>>>>>> ', error.message)
	}

	return res.status(meta.status_code).json(AppResponse.format(meta))
}
