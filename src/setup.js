import Log from 'colorprint'
import config from 'config'
import q from 'q'
import mongoose from 'mongoose'

class Setup {
	/**
	 * This will initialize setup
	 */
	static initialize() {
		this.setupMongoose()

		const apiVersion = Array.from(config.get('api.versions'))
		Log.notice('apiVersion', typeof apiVersion)
		this.setupApiVersion(apiVersion.pop())
	}

	/**
	 * This will setup mongodb
	 */
	static setupMongoose() {
		mongoose.Promise = q.Promise
		mongoose.connection.on('open', () => {
			Log.notice('Mongoose connected to mongo shell.')
			Log.notice('mongodb url ', config.get('db.url'))
		})
		mongoose.connection.on('error', err => {
			Log.notice('Mongoose could not connect to mongo shell!')
			Log.notice(err)
		})
		mongoose.connection.on('disconnected', function() {
			Log.notice('Mongoose connection to mongodb shell disconnected')
		})
		mongoose.set('debug', true)
		mongoose.connect(config.get('db.url'), {
			useUnifiedTopology: true,
			useNewUrlParser: true
		})
	}

	/**
	 * @param {Number} version The configuration object
	 * This will setup default api version.
	 */
	static setupApiVersion(version) {
		// @ts-ignore
		Log.notice('Setting api version ', version)
		process.env.API_VERSION = `v${version}`
	}
}

export default Setup
