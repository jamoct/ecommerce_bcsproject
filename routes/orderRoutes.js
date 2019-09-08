const express = require('express'),
	router = express.Router(),
	controller = require('../controllers/OrderController');

// Orders Catalog
router.get('/orders', controller.showAllOrders); // show all orders
router.get('/admin/orders/:userid', controller.showOneOrder); // show one product by userid
router.get('/admin/orders/id/:id', controller.showOrderbyId); // show product by mongoose id
router.post('/admin/orders/add', controller.addOrder); // add product
router.post('/admin/orders/delete', controller.deleteOrder); // remove product
router.post('/admin/orders/update', controller.updateOrder); // update product
router.post('/admin/orders/deleteall', controller.deleteAll); // delete all orders
router.post('/sendemail', controller.sendEmail); // send email

module.exports = router;