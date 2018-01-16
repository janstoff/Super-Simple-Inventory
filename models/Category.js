const mongoose = require('mongoose')
const { Schema } = mongoose

const subcategorySchema = require('./SubCategory')


const categorySchema = new Schema({
	name: String,
	subcategories: [subcategorySchema]
})

mongoose.model('categories', categorySchema)
