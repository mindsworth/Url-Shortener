import express from 'express'
import config from 'config'
import Setup from './setup'

const app = express()

Setup.initialize()
app.set('port', config.get('app.port'))
const PORT = app.get('port')
app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Application listening on ${config.get('app.baseUrl')}`)
	// eslint-disable-next-line no-console
	console.log(`Environment => ${config.util.getEnv('NODE_ENV')}`)
})
