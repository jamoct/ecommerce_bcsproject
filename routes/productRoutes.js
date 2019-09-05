const express = require('express'),
	router = express.Router(),
	controller = require('../controllers/ProductController');

// Product Catalog
router.get('/products', controller.showAllProducts); // show all products
router.get('/products/:id', controller.showProductbyId); // show one product by ID
router.get('/admin/products/:sku', controller.showOneProduct); // show one product by SKU
router.post('/admin/products/add', controller.addProduct); // add product
router.post('/admin/products/delete', controller.deleteProduct); // remove product
router.post('/admin/products/update', controller.updateProduct); // update product
router.post ('/products/stockupdate'); // update stock by product mongoose ID

module.exports = router;