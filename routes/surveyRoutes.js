const mongoose = require('mongoose')
const _ = require('lodash')
const Path = require('path-parser')
const { URL } = require('url')

const requireLogin = require('../middleware/requireLogin')
const requireCredits = require('../middleware/requireCredits')
const Survey = mongoose.model('surveys')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

module.exports = app => {

	app.post('/api/surveys/webhooks', (req, res) => {
		const path = new Path('/api/surveys/:surveyId/:choice')

		const events = _.chain(req.body)
			.map(({ url, email }) => {
				const result = path.test(new URL(url).pathname)
				if (result) {
					return { email: email, surveyId: result.surveyId, choice: result.choice }
				}
			})
			.compact() // remove undefined elements
			.uniqBy('email', 'surveyId') // remove duplicates
			.value() // return the resulting array

		console.log(events)
		res.send({})
	})


	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks for voting!')
	})

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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

		try {
			// Create an instance of Mailer for sending survey emails
			const mailer = new Mailer(survey, surveyTemplate(survey))
			await mailer.send()
			await survey.save()
			req.user.credits -= 1
			const user = await req.user.save()

			res.send(user)
		} catch (err) {
			res.status(422).send(err)
		}
	})
}
