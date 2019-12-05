require('dotenv').config()

const PORT = process.env.PORT || 5000

module.exports = {
	app: {
		port: PORT,
		baseUrl: `http://localhost:${PORT}`
	},
	api: {
		prefix: '^/api/v[1-9]/[a-zA-Z*]{2}'
	},
	db: {
		url: process.env.DB_URL
	}
}
