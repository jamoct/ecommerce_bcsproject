const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
	productId: {
		type: mongoose.Types.ObjectId,
		ref: 'Product'
	},
	userId: String,
	orderedquantity:Number,
	price:Number,
	cost:Number,
	SKU: {type: String, unique: true},
	paidStatus: String
})

module.exports = mongoose.model('cart', CartSchema);