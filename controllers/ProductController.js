const products = require('../models/ProductModel');
const cart = require('../models/CartModel');

class ProductController {

	// show all products /products 
	async showAllProducts (req, res) {
		try {
			const allProducts = await products.find({});
			res.send(allProducts);
		}
		catch(e){
			res.send({e});
		}
	}

	// show product by SKU /admin/products/:sku
	async showOneProduct (req, res) {
		let {sku} = req.params;
		try {
			const oneProduct = await products.findOne({SKU:sku});
			res.send(oneProduct);
		}
		catch(e){
			res.send({e});
		}
	}

	// show product by ID /products/:id GET
	async showProductbyId (req, res) {
		let {id} = req.params;
		try {
			const oneProduct = await products.findOne({_id:id});
			res.send(oneProduct);
		}
		catch(e){
			res.send({e});
		}
	}

	// add products /admin/products/add
	async addProduct (req, res){
		let {name, price, photoURL, quantity, SKU, desc} = req.body;
		if (!name || !price || !photoURL || !quantity || !SKU || !desc) return res.send({message: 'All fields are required.'});
		try{
			const checkName = await products.findOne({name});
			if (checkName) return res.send({message: 'Item already exists. Please rename your item.'});
			const checkPhoto = await products.findOne({photoURL});
			if (checkPhoto) return res.send({message: 'This URL is already linked to another item.'});
			const checkSKU = await products.findOne({SKU});
			if (checkSKU) return res.send({message: 'SKU already exists. Please create a new one.'}); 
			const newProduct = {
				name,
				price,
				photoURL,
				quantity,
				SKU,
				desc
			};
			const createProduct = await products.create(newProduct);
			res.send({ok:true, message: 'Item successfully added to the catalogue.', createProduct})
		}
		catch(e){
			res.send({e});
		}
	}

	// delete 1 product /admin/products/delete
	async deleteProduct (req, res) {
		try {
			let {_id} = req.body;
			const removeProduct = await products.deleteOne({_id});
			res.send(removeProduct);
		}
		catch(e){
			res.send({e});
		}
	}

	// update product /admin/products/update
	async updateProduct (req, res){
		let {newName, newPrice, newPhotoURL, newQuantity, newSKU, newDesc, _id, productId} = req.body;
		try{
			let updated;
			let updatedCart;
			if (newName !== undefined) {
				updated =  await products.updateOne({_id}, 
				{$set:{name:newName}});
			}
			if (newPrice !== undefined) {
				updated =  await products.updateOne({_id}, 
				{$set:{price:newPrice}});
				updatedCart = await cart.updateOne({productId},
				{$set:{price:newPrice}});
			}
			if (newPhotoURL !== undefined) {
				updated =  await products.updateOne({_id}, 
				{$set:{photoURL:newPhotoURL}});
			}
			if (newQuantity !== undefined) {
				updated =  await products.updateOne({_id}, 
				{$set:{quantity:newQuantity}});
			}
			if (newSKU !== undefined) {
				updated =  await products.updateOne({_id}, 
				{$set:{SKU:newSKU}});
				updatedCart = await cart.updateOne({productId},
				{$set:{SKU:newSKU}});
			}
			if (newDesc !== undefined) {
				updated =  await products.updateOne({_id}, 
				{$set:{desc:newDesc}});
			}
			res.send({updated, cart: updatedCart});
		}
		catch(e){
			res.send({e})
		}
	}

} 

module.exports = new ProductController();