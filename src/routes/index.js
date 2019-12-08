import { OK } from '../utils/status-codes'
import AppResponse from '../utils/app-response'

const routes = router => {
	router.route('/').get((req, res) => {
		const meta = AppResponse.getSuccessMeta()
		const welcomeMessage = {
			message: 'Welcome to myDiary app for everyone.'
		}

		return res.status(OK).json(AppResponse.format(meta, welcomeMessage))
	})
}

export default routes
