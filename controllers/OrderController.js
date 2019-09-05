const orders = require('../models/OrderModel');
const nodemailer = require("nodemailer");
const pwd = require('../p').pwd;

const transport = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'joyce@barcelonacodeschool.com',
		pass: pwd,
	},
});

class OrderController {

	// show all orders /orders/all
	async showAllOrders (req, res) {
		try {
			const allOrders = await orders.find({});
			res.send(allOrders);
		}
		catch(e){
			res.send({e});
		}
	}

	// show product by user id /admin/orders/:userid
	async showOneOrder (req, res) {
		let {userid} = req.params;
		try {
			const oneOrder = await orders.find({userId:userid});
			res.send(oneOrder);
		}
		catch(e){
			res.send({e});
		}
	}

	// add orders /admin/orders/add
	async addOrder (req, res){
		let {userId, products, itemTotal, shippingFee, subtotal, paymentTotal, shippedStatus, shippingNumber, currentStatus, paidStatus, orderId, firstName, lastName, addressline1, addressline2, city, country, state, postal_code, contactNumber, notes} = req.body;
		if (!firstName || !lastName || !addressline1 || !city || !country || !state || !postal_code || !contactNumber) return res.send({message: 'All fields are required.'});
		try{
			const newOrder = {
				userId, products, itemTotal, shippingFee, subtotal, paymentTotal, shippedStatus, shippingNumber, currentStatus, paidStatus, orderId, firstName, lastName, addressline1, addressline2, city, country, state, postal_code, contactNumber, notes
			};
			const createOrder = await orders.create(newOrder);
			res.send({ok:true, message: 'Shipping address saved.', createOrder})
		}
		catch(e){
			res.send(e);
		}
	}

	// delete 1 product /admin/orders/delete
	async deleteOrder (req, res) {
		try {
			let {_id} = req.body;
			const removeOrder = await orders.deleteOne({_id});
			res.send(removeOrder);
		}
		catch(e){
			res.send({e});
		}
	}

	// delete all orders /admin/orders/delete/all
	async deleteAll (req, res) {
		try {
			const removeAll = await orders.remove({});
			res.send(removeAll);
		}
		catch(e){
			res.send(e);
		}
	}

	// update product /admin/orders/update
	async updateOrder (req, res){
		let {newcurrentStatus, newshippedStatus, newshippingNumber, newnotes, newpaidStatus, _id} = req.body;
		try{
			let updated;
			if (newcurrentStatus !== undefined) {
				updated =  await orders.updateOne({_id}, 
				{$set:{currentStatus:newcurrentStatus}});
			}
			if (newpaidStatus !== undefined) {
				updated =  await orders.updateOne({_id}, 
				{$set:{paidStatus:newpaidStatus}});
			}
			if (newshippedStatus !== undefined) {
				updated =  await orders.updateOne({_id}, 
				{$set:{shippedStatus:newshippedStatus}});
			}
			if (newshippingNumber !== undefined) {
				updated =  await orders.updateOne({_id}, 
				{$set:{shippingNumber:newshippingNumber}});
			}
			if (newnotes !== undefined) {
				updated =  await orders.updateOne({_id},
				{$set:{notes:newnotes}});
			}
			res.send(updated);
		}
		catch(e){
			res.send({e})
		}
	}

	// show product by ID /admin/orders/id/:id GET
	async showOrderbyId (req, res) {
		let {id} = req.params;
		try {
			const oneOrder = await orders.find({_id:id});
			res.send(oneOrder);
		}
		catch(e){
			res.send({e});
		}
	}

	// send email /sendemail POST
	async sendEmail (req, res) {
		try {
			let {name, subject, header, message} = req.body;
			const mailOptions = {
				to: 'joyce@barcelonacodeschool.com',
				subject: subject,
				// composing body of the email
				html: '<h3>'+ header + '</h3><p>' + message + '</p>'
			};
			transport.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);
					return res.send(error);
					// return res.redirect('/contacts')
				}
			console.log(`Message sent: ${info.response}`);
			// res.redirect('/contacts')
			return res.send({message: "Email sent."});
			});
		}
		catch(e){
			res.send({e});
		}
	}

} 

module.exports = new OrderController();