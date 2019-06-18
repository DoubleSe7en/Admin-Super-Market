var express = require('express');
var router = express.Router();
var products_controller = require('../controllers/products/productController');


//Danh sách sản phẩm
router.get('/listProduct', products_controller.listProduct);

//Chi tiết
router.get('/:id', products_controller.detailProduct);

//Hiện trang thêm
router.get('/addProduct', products_controller.addProductPage);

//Xử lý thêm
router.post('/add_Product', products_controller.addProductProcess);



//Chỉnh sửa
router.post('/editProduct/:id', products_controller.editProduct);





//Xóa
router.post('/delete_product/:id', products_controller.deleteProduct);

module.exports = router;
