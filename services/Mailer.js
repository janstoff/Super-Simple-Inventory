const sendgrid = require('sendgrid')
const helper = sendgrid.mail
const keys = require('../config/keys')

class Mailer extends helper.Mail {
	constructor({ subject, recipients }, content) {
		super()

		this.sendgridAPI = sendgrid(keys.sendgridKey)

		this.from_email = new helper.Email('no-reply@emaily.com')
		this.subject = subject
		this.body = new helper.Content('text/html', content)
		this.recipients = this.formatAddresses(recipients)

		this.addContent(this.body) // addContent() is built into helper.Mail
		this.addClickTracking()
		this.addRecipients()
	}

	// Create helper func for formatting array of email objects
	formatAddresses(recipients) {
		return recipients.map(({ email }) => {
			return new helper.Email(email)
		})
	}

	// Create helper func to track recipient interaction with emails
	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings()
		const clickTracking = new helper.ClickTracking(true, true)

		trackingSettings.setClickTracking(clickTracking)
		this.addTrackingSettings(trackingSettings)
	}

	addRecipients() {
		const personalize = new helper.Personalization()

		this.recipients.forEach(recipient => {
			//add recipient to personalize object
			personalize.addTo(recipient)
		})

		this.addPersonalization(personalize)
	}

	async send() {
		const request = this.sendgridAPI.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
		})

		const response = await this.sendgridAPI.API(request)
		return response
	}
}

module.exports = Mailer
