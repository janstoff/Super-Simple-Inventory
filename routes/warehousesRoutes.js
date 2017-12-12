const mongoose = require('mongoose')

const requireLogin = require('../middleware/requireLogin')
const Warehouse = mongoose.model('warehouses')


module.exports = app => {
	app.get('/api/warehouses', requireLogin, async (req, res) => {
		const warehouses = await Warehouse.find({})

		res.send(warehouses)
	})

  app.post('/api/warehouses', requireLogin, async (req, res) => {
    const { name } = req.body

    const warehouse = new Warehouse({
      name
    })

    try {
      await warehouse.save()
      res.send(warehouse)
    } catch (err) {
			res.status(422).send(err)
    }
  })
}
