import mongoose from 'mongoose'

const { Schema } = mongoose

const UrlSchema = new Schema(
	{
		url_code: String,
		long_url: String,
		short_url: String
	},
	{
		timestamps: true
	}
)

export default mongoose.model('Url', UrlSchema)
