const mongoose = require('mongoose')
const { Schema } = mongoose

const itemSchema = new Schema({
	name: String,
  category: String,
	subCategory: String,
  warehouse: String,
  quantity: { type: Number, default: 0 },
  minimumAvailableQuantity: { type: Number, default: null },
  dateCreated: Date,
  dateChanged: Date,
	lastChangedBy: String
})

mongoose.model('items', itemSchema)
