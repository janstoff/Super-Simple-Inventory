// Route Handlers
const passport = require('passport')

module.exports = (app) => {
  app.get(
  	'/auth/google',
  	//1. argument is the path
  	passport.authenticate('google', {
  		scope: ['profile', 'email']
    //2. argument is code to be executed when the request comes in
  	})
  )

  app.get(
    '/auth/google/callback',
    passport.authenticate('google')
    //this time the auth via passport will pick up and pass on the returned code
  )
}
