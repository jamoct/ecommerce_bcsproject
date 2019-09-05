const cart = require('../models/CartModel');
const stripe = require("stripe")("sk_test_yLHOEF3v05aIVKE6EJtxnQUR008HU3gqvl");

class CartController {

	//all shopping cart products /cart/all
	async showAllCarts (req, res) {
		try {
			const carts = await cart.find({});
			res.send(carts);
		}
		catch(e){
			res.send({e});
		}
	}

	//shopping cart products /cart
	async showCartbyId (req, res) {
		let {userId} = req.params;
		try {
			const carts = await cart.find({userId: userId}); 
			res.send(carts);
		}
		catch(e){
			res.send({e});
		}
	}

	// check if product is in the cart already /cart/:userId/:productId
	async checkProdInCart (req, res) {
		let {userId, productId} = req.params;
		try {
			const carts = await cart.find({userId: userId, productId: productId});
			if (carts.length == 0) {
				res.send({found: false, carts});
			} else {
				res.send({found: true, carts, message: "Item is already in the cart!"});
			}
		}
		catch(e){
			res.send({e});
		}
	}

	// add to cart
	async addToCart (req, res){
		let {userId, productId, orderedquantity, SKU, price, cost, paidStatus} = req.body;
		if (!userId || !productId || !orderedquantity || !SKU) return res.send({message: 'All fields are required.'});
		try{
			let itemCost = orderedquantity * price;
			const addProduct = await cart.create({
				userId:userId,
				productId:productId, 
				orderedquantity:orderedquantity, 
				SKU:SKU,
				price:price,
				cost:itemCost,
				paidStatus:paidStatus
			});
			res.send(addProduct);
		}
		catch(e){
			res.send({e});
		}
	}

	// remove product
	async removeFromCart (req, res){
		let {productId} = req.body;
		try {
			const deleteProduct = await cart.deleteOne({productId});
			res.send(deleteProduct);
		}
		catch(e){
			res.send({e});
		}
	}

	// update qty
	async updateCart (req, res){
		let {newQty, productId, price, newpaidStatus, userId} = req.body;
		try{
			let updated;
			let itemCost = newQty * price;
			if (newQty !== undefined) {
				updated =  await cart.updateOne({productId}, 
				{$set:{orderedquantity:newQty, cost:itemCost}});
			}
			if (newpaidStatus !== undefined) {
				updated =  await cart.updateOne({userId}, 
				{$set:{paidStatus:newpaidStatus}});
			}
			res.send(updated);
		}
		catch(e){
			res.send({e})
		}
	}

	// clear cart
	async clearCart (req, res){
		let {userId} = req.body;
		try {
			const deleteCart = await cart.deleteMany({userId});
			res.send(deleteCart);
		}
		catch(e){
			res.send({e});
		}
	}

	// stripe payment
	async payment (req, res){
		try{
			const result = await stripe.charges.create(req.body);
			res.status(200).send({result});
		}
		catch(error){
			res.status(500).send({error});
		}
	}

}

module.exports = new CartController();