const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
	//category_id
	name: {type: String, unique: true},
	price:Number,
	photoURL: {type: String, unique: true},
	quantity:Number,
	SKU: {type: String, unique: true},
	desc:String
})

module.exports = mongoose.model('products', ProductSchema);