const mongoose = require('mongoose')

const requireLogin = require('../middleware/requireLogin')
const Item = mongoose.model('items')

module.exports = app => {
	app.get('/api/items', requireLogin, async (req, res) => {
		const items = await Item.find({})

		res.send(items)
	})

	app.post('/api/items', requireLogin, async (req, res) => {
		const {
			name,
			category,
			subcategory,
			warehouse,
			quantity,
			minimumAvailableQuantity
		} = req.body

		// Create an instance of a item in memory
		const item = new Item({
			name,
			category,
			subCategory,
			warehouse,
			quantity,
			minimumAvailableQuantity,
			dateCreated: Date.now(),
			lastChangedBy: Date.now(),
			lastChangedBy: req.user.userName
		})

		try {
			const user = await req.user.save()
			res.send(user)
		} catch (err) {
			res.status(422).send(err)
		}
	})
}
