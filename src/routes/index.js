const routes = router => {
	router.route('/').get((req, res) =>
		res.status(200).json({
			message: 'Welcome to myDiary app for everyone.'
		})
	)
}

export default routes
