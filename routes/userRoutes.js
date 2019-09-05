const express = require('express'),
	router = express.Router(),
	controller = require('../controllers/AdminController');

router.get('/', controller.showHome); // Home
router.get('/admin', controller.showAdmin); // show all admin

router.post('/admin/register', controller.registerAdmin); // register admin
router.post('/admin/login', controller.loginAdmin); // log in admin
router.post('/admin/remove/:id', controller.deleteAdmin); // remove admin
router.post('/verifytoken', controller.verifyTokenPost); // verify token by post
router.post('/admin/check', controller.showOneAdmin); // show one admin

module.exports = router;