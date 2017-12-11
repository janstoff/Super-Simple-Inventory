const mongoose = require('mongoose')
const { Schema } = mongoose

const itemSchema = new Schema({
	itemName: String,
  category: String,
	subCategory: String,
  warehouse: String,
	rental: { type: Boolean, default: false },
  quantity: { type: Number, default: 0 },
  // dateCreated: Date,
  // dateChanged: Date,
	// lastChangedBy: String
})

mongoose.model('items', itemSchema)
