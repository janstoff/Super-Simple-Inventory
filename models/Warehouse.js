const mongoose = require('mongoose')
const { Schema } = mongoose

const warehouseSchema = new Schema({
	name: String
})

mongoose.model('warehouses', warehouseSchema)
