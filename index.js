const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send({ hi: 'there' })
})

const PORT = process.env.PORT || 5000
//heroko injects environment variables in this case the port,
//while there is no port, i.e. dev mode we use localhost:5000

app.listen(5000)
