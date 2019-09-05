const express = require('express'),
	router = express.Router(),
	controller = require('../controllers/CartController');

// Shopping Cart
router.get('/cart/all', controller.showAllCarts); // show all carts
router.get('/cart/:userId', controller.showCartbyId); // show products in cart by userID
router.get('/cart/:userId/:productId', controller.checkProdInCart) // check if product is in cart or not
router.post('/cart/add', controller.addToCart); // add product in cart
router.post('/cart/remove', controller.removeFromCart); // remove product in cart
router.post('/cart/update', controller.updateCart); // update qty
router.post('/cart/clear', controller.clearCart); // clear cart
router.post('/payment', controller.payment); // payment

module.exports = router;