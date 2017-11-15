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
		accessToken => {
			console.log(accessToken)
		}
	)
)

const PORT = process.env.PORT || 5000
//heroko injects environment variables in this case the port,
//while there is no port, i.e. dev mode we use localhost:5000
app.listen(PORT)
