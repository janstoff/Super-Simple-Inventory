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
	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id })
			//exclude recipient list
			.select({ recipients: false })

		res.send(surveys)
	})

	app.post('/api/surveys/webhooks', (req, res) => {
		const path = new Path('/api/surveys/:surveyId/:choice')

		_.chain(req.body)
			.map(({ url, email }) => {
				const result = path.test(new URL(url).pathname)
				if (result) {
					return {
						email: email,
						surveyId: result.surveyId,
						choice: result.choice
					}
				}
			})
			// remove undefined elements
			.compact()
			// remove duplicates
			.uniqBy('email', 'surveyId')
			// find and update survey and its recipients
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							$elemMatch: { email: email, responded: false }
						}
					},
					{
						// update criteria
						$inc: { [choice]: 1 },
						$set: { 'recipients.$.responded': true },
						lastResponded: new Date()
					}
				).exec()
			})
			// return the resulting array
			.value()

		res.send({})
	})

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
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
