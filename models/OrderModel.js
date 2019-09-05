const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
	userId: String,
	products: {type: Array},
	itemTotal: Number,
	shippingFee: Number,
	subtotal: Number,
	paymentTotal: Number,
	shippedStatus: String,
	shippingNumber: String,
	currentStatus: String,
	paidStatus: String,
	orderId: String,
	firstName: String,
	lastName: String,
	addressline1: String,
	addressline2: String,
	city: String,
	country: String,
	state: String,
	postal_code: String,
	contactNumber: String,
	notes: String
})

module.exports = mongoose.model('orders', OrderSchema);