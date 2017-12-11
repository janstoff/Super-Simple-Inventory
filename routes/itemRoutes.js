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
			itemName,
			category,
			subcategory,
			warehouse,
			rental,
			quantity,
		} = req.body

		// Create an instance of a item in memory
		const item = new Item({
			itemName,
			category,
			subCategory,
			warehouse,
			rental,
			quantity,
			// dateCreated: Date.now(),
			// lastChangedBy: Date.now(),
			// lastChangedBy: req.user.userName
		})

		try {
			await item.save()

			const user = await req.user.save()
			res.send(user)
		} catch (err) {
			res.status(422).send(err)
		}
	})
}
