const mongoose = require('mongoose')
const { Schema } = mongoose

// create user Schema
const userSchema = new Schema({
	googleId: String,
	userName: String,
	email: String
	// freely add properties here ...
})

// create users collection
mongoose.model('users', userSchema)
