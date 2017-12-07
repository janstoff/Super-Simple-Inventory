const mongoose = require('mongoose')
const _ = require('lodash')
const Path = require('path-parser')
const { URL } = require('url')

const requireLogin = require('../middleware/requireLogin')
const Item = mongoose.model('items')

module.exports = app => {
	app.get('/api/items', requireLogin, async (req, res) => {
		const items = await Item.find({ _user: req.user.id })
			//exclude recipient list
			.select({ recipients: false })

		res.send(items)
	})


	app.post('/api/items', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body

		// Create an instance of a item in memory
		const item = new Item({
			name,
			category,
			subCategory,
			warehouse,
			quantity,
			minimumAvailableQuantity,
			dateCreated: Date.now(),
			lastChangedBy
		})

		try {
			const user = await req.user.save()
			res.send(user)
		} catch (err) {
			res.status(422).send(err)
		}
	})
}
