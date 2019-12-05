/* eslint-disable no-console */
import express from 'express'
import config from 'config'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import Setup from './setup'
import routes from './routes'

Setup.initialize()

const app = express()
const router = express.Router()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(logger('dev'))

routes(router)

const prefix = config.get('api.prefix')
app.use(prefix, router)

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found')
	err.status = 404
	next(err)
})

app.set('port', config.get('app.port'))
const PORT = app.get('port')
app.listen(PORT, () => {
	console.log(`Application listening on ${config.get('app.baseUrl')}`)
	console.log(`Environment => ${config.util.getEnv('NODE_ENV')}`)
})
