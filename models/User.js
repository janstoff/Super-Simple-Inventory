const mongoose = require('mongoose')
const { Schema } = mongoose

// create user Schema
const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 }
	// freely add properties here ...
})

// create users collection
mongoose.model('users', userSchema)
