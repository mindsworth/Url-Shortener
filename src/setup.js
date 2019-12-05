/* eslint-disable no-console */
import config from 'config'
import q from 'q'
import mongoose from 'mongoose'

class Setup {
	/**
	 * This will initialize setup
	 */
	static initialize() {
		this.setupMongoose()
	}

	/**
	 * This will setup mongodb
	 */
	static setupMongoose() {
		mongoose.Promise = q.Promise
		mongoose.connection.on('open', () => {
			console.log('Mongoose connected to mongo shell.')
			console.log('mongodb url ', config.get('db.url'))
		})
		mongoose.connection.on('error', err => {
			console.log('Mongoose could not connect to mongo shell!')
			console.log(err)
		})
		mongoose.connection.on('disconnected', function() {
			console.log('Mongoose connection to mongodb shell disconnected')
		})
		mongoose.set('debug', true)
		mongoose.connect(config.get('db.url'), {
			useUnifiedTopology: true,
			useNewUrlParser: true
		})
	}
}

export default Setup
