const product = require('../../models/productModel');




//Trang thêm
exports.addProductPage = async(req, res) => {
    res.render('productManager/addProduct', {title:'Thêm sản phẩm'})
};

//Xử lý thêm
exports.addProductProcess = async(req, res) => {
    product.addProduct(req, res);
};

//Sửa 
exports.editProduct = async(req, res) => {
    product.editProduct(req, res);
};

//Xóa 
exports.deleteProduct = async(req, res) => {
    product.deleteProduct(req, res);
};


//Danh sách
exports.listProduct = async(req, res) => {
    product.list.find({}).exec((err,Product)=>{
        if(err){
            console.log('Thất bại');
        }
        else{
            res.render('productManager/products', {title: 'Danh sách sản phẩm', Product});
        }
    })
};

//Chi tiết
exports.detailProduct = async (req, res) => {
    product.list.findById(req.params.id).then(productFound =>{
        if (!productFound)
        {
            res.send('Thất bại');
        }
        res.render('productManager/detailProduct',{title:'Chi tiết', productFound})
    })
}




