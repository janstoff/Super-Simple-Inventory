const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./config/keys')

const app = express()

//make passport aware of new GoogleStrategy
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			console.log('accessToken', accessToken)
			console.log('refreshToken', refreshToken)
			console.log('profile', profile)
		}
	)
)

app.get(
	'/auth/google',
	//first argument is the path
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
	//second is code to be executed when the request comes in
)

app.get(
  '/auth/google/callback', 
  passport.authenticate('google')
)
//this time the authentication via passport will pick up the returned code in the HTTP request

const PORT = process.env.PORT || 5000
//heroko injects environment variables in this case the port,
//while there is no port, i.e. dev mode we use localhost:5000
app.listen(PORT)
