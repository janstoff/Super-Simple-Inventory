const express = require('express')
const authRoutes = require('./routes/authRoutes')
require('./services/passport') // not passing any specific variable down to index.js

// create express app
const app = express()

// call authRoutes function passing express app
authRoutes(app)

//heroko injects environment variables in this case the port,
//while there is no port, i.e. dev mode we use localhost:5000
const PORT = process.env.PORT || 5000
app.listen(PORT)
