const mongoose = require('mongoose')

const requireLogin = require('../middleware/requireLogin')
const Category = mongoose.model('categories')


module.exports = app => {
	app.get('/api/categories', requireLogin, async (req, res) => {
		const categories = await Category.find({})

		res.send(categories)
	})

  app.post('/api/categories', requireLogin, async (req, res) => {
    const { name } = req.body

    const category = new Category({
      name,
			subcategories
    })

    try {
      await category.save()
      res.send(category)
    } catch (err) {
			res.status(422).send(err)
    }
  })
}
