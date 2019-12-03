require('dotenv').config()

const PORT = process.env.PORT || 5000

module.exports = {
	app: {
		port: PORT,
		baseUrl: `http://localhost:${PORT}`
	},
	db: {
		url: process.env.DB_URL
	}
}
