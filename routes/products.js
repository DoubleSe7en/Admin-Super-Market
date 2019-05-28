var express = require('express');
var router = express.Router();

var products_controller = require('../controllers/products/productController');


//Get list product
router.get('/products', products_controller.listProduct)

//Get detail product
router.get('/products/:id', products_controller.detailProduct)

//Get add product page
router.get('/addProduct', products_controller.addProduct)




module.exports = router;
