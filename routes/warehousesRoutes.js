const mongoose = require('mongoose')

const requireLogin = require('../middleware/requireLogin')
const Warehouse = mongoose.model('warehouses')

module.exports = app => {
	app.get('/api/warehouses', requireLogin, async (req, res) => {
		const warehouses = await Warehouse.find({})

		res.send(warehouses)
	})

	app.post('/api/warehouses', requireLogin, async (req, res) => {
		const { warehouses } = req.body

		await Warehouse.find({}).deleteMany({})

		await warehouses.forEach(function(warehouse) {
			const newWarehouse = new Warehouse({
				name: warehouse.name
			})

			newWarehouse.save()
		})

		//the above is still not properly chained in async fashion leading to incomplete warehouse array on the app

		const updatedWarehouses = await Warehouse.find({})

		try {
			res.send(updatedWarehouses)
		} catch (err) {
			res.status(422).send(err)
		}
	})
}
