const admin = require('../models/AdminModel'),
	bcrypt = require('bcrypt'),
	jwt = require('jsonwebtoken'),
	config = require('../config'),
	saltRounds = 10;

class AdminController {

	async showAdmin (req, res) {
		try {
			const allAdmins = await admin.find({});
			res.send(allAdmins);
		}
		catch(e){
			res.send({e});
		}
	}

	async showOneAdmin (req, res) {
		let {email} = req.body;
		try {
			const oneAdmin = await admin.findOne({email});
			res.send({ok: true, oneAdmin});
		}
		catch(e){
			res.send({e});
		}
	}

	async registerAdmin (req, res) {
		let {email, password, password2} = req.body;
		if (!email || !password || !password2) return res.send({message: 'All fields are required.'});
		if (password !== password2) return res.send({message: 'Passwords do not match.'})
		try {
			const findAdmin = await admin.findOne({email});
			if (findAdmin) return res.send({message: 'Email address already exists.'});
			const encrypted = await bcrypt.hash(password, saltRounds);
			console.log('hash =', encrypted);
			const newAdmin = {email, password: encrypted};
			const createAdmin = await admin.create(newAdmin);
			res.send({ok:true, message: 'Admin successfully registered. You will now be redirected to the login page.', createAdmin})
		}
		catch(e){
			res.send({e});
		}
	}

	async loginAdmin (req, res) {
		let {email, password} = req.body;
		if (!email || !password) return res.send({message:'All fields are required.'})
		try {
			const findAdmin = await admin.findOne({email});
			if (!findAdmin) return res.send({message: 'Please provide a valid email address.'});
			const match = await bcrypt.compare(password, findAdmin.password);
			if (match) {
				const token = jwt.sign(findAdmin.toJSON(), config.secret, {expiresIn: 100080});
				res.send({ok:true, token, email, message: 'Login successful. Admin dashboard loading...'});
			} else {
				return res.send({message: 'Invalid password.'})
			}
		}
		catch(e){
			res.send({e});
		}
	}

	async verifyTokenPost (req, res) {
		let {token} = req.body;
		try {
			const decoded = jwt.verify(token, config.secret);
			console.log('decoded =', decoded);
			res.send({ok:true, message: 'secret page'});
		}
		catch(e){
			res.send({e});
		}
	}

	async deleteAdmin (req, res) {
		let {id} = req.params;
		try {
			const remove = await admin.deleteOne({_id:id});
			res.send(remove);
		}
		catch(e){
			res.send({e});
		}
	}
}

module.exports = new AdminController();