// Route Handlers
const passport = require('passport')

module.exports = app => {
	app.get(
		//1. argument is the path
		//2. argument is code to be executed when the request comes in
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	)

	app.get(
		//this time the auth via passport will pick up and pass on the returned code
		'/auth/google/callback',

		// continue only if email is an OMR email!!!
		passport.authenticate('google')
	)

	app.get('/api/logout', (req, res) => {
		req.logout()
		res.send(req.user)
	})

	app.get('/api/current_user', (req, res) => {
		res.send(req.user)
	})
}
