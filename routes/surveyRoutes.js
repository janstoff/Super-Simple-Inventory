const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const requireCredits = require('../middleware/requireCredits')

const Survey = mongoose.model('surveys')

module.exports = app => {
	app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body

    const survey = new Survey({ //create an instance of a survey in memory
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })), //create an array of objects
      //yes: default to 0,
      //no: default to 0,
      _user: req.user.id,
      dateSent: Date.now()
    })
  })
}
