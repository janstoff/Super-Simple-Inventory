const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const authRoutes = require('./routes/authRoutes')
const keys = require('./config/keys')

// mongoose and passport config to load whenever app starts
// - load mongoose first because passport is using the User model
require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI)

// create express app
const app = express()

// tell the app to use cookies using cookie-sessions
app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000, //30 days
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

// call authRoutes function passing express app
authRoutes(app)

//heroko injects environment variables in this case the port,
//while there is no port, i.e. dev mode we use localhost:5000
const PORT = process.env.PORT || 5000
app.listen(PORT)
