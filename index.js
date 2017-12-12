// mongoose and passport CONFIG to load whenever app starts
// - load mongoose first because passport is using the User model
const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')

require('./models/User')
require('./models/Item')
require('./models/Category')
require('./models/Warehouse')
require('./services/passport')

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI)

// create express app
const app = express()

//MIDDLEWARE (via app.use())
//parse incoming put, post, patch, whatever requests and assign to req.body
app.use(bodyParser.json())
// tell the app to use cookies using cookie-sessions
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
		keys: [keys.cookieKey]
	})
)
app.use(passport.initialize())
app.use(passport.session())

// ROUTES
require('./routes/authRoutes')(app)
require('./routes/itemsRoutes')(app)
require('./routes/categoriesRoutes')(app)
require('./routes/warehousesRoutes')(app)

if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets such as main.js and main.css
	// if the requested ROUTE is not previously defined look in client/build
	app.use(express.static('client/build'))

	// Express will serve up the index.html file
	// if we don't recognize the ROUTE at all we assume react-router will handle it via index.html
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

//ENVIRONMENT
const PORT = process.env.PORT || 5000
app.listen(PORT)
//heroko injects environment variables in this case the port,
//while there is no port, i.e. dev mode we use localhost:5000
