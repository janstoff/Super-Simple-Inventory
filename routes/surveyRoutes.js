const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const requireCredits = require('../middleware/requireCredits')

const Survey = mongoose.model('surveys')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

module.exports = app => {
	app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
		const { title, subject, body, recipients } = req.body

    // Create an instance of a survey in memory
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })), //create an array of objects
			_user: req.user.id,
			dateSent: Date.now()
		})

    // Create an instance of Mailer for sending survey emails
    const mailer = new Mailer(survey, surveyTemplate(survey))
    mailer.send()
	})
}
