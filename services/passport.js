// Passport.js
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

// generate a unique identifying piece of info using passport
passport.serializeUser((user, done) => {
	done(null, user.id) //shortcut to mongo user id
})

// take id and turn it back into a User model
passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user)
		})
})

//make passport aware of new GoogleStrategy
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true //trust Heroku proxy and calculate callbackURL as https not http
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					//already have record for that user id
					done(null, existingUser)
				} else {
					//make new record
					new User({ googleId: profile.id })
						.save()
						.then(newUser => done(null, newUser))
				}
			})
		}
	)
)
