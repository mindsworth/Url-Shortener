import Log from 'colorprint'
import http from 'http'
import express from 'express'
import config from 'config'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import Setup from './setup'
import routes from './routes'
import errorHandler from './middleWares/error-handler'
import AppError from './utils/app-error'

Setup.initialize()

const app = express()
const router = express.Router()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(logger('dev'))

routes(router)

// catch 404 and forward to error handler
app.use('*', (req, res, next) => {
	const err = new AppError('Not Found', 404)
	next(err)
})

// development error handler
// will print stacktrace
app.use(errorHandler)

const prefix = config.get('api.prefix')
app.use(prefix, router)

app.set('port', config.get('app.port'))
const PORT = app.get('port')
const server = http.createServer(app)
server.listen(PORT, () => {
	Log.notice(`Application listening on ${config.get('app.baseUrl')}`)
	Log.notice(`Environment => ${config.util.getEnv('NODE_ENV')}`)
})
