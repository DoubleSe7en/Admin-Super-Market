const product = require('../../models/productModel');

//View list product
exports.listProduct = function(req, res) {
    product.find({}).exec((err,Product)=>{
        if(err){
            console.log('Thất bại');
        }
        else{
            res.render('productManager/products', {title: 'Danh sách sản phẩm', Product});
        }
    })

};

//View single product
exports.detailProduct = function (req, res) {
    product.findById(req.params.id).then(productFound =>{
        if (!productFound)
        {
            res.send('Thất bại');
        }
        res.render('productManager/detailProduct',{title:'Chi tiết', productFound})
    })
}

//View page add product
exports.addProduct = function(req, res) {
    res.render('productManager/addProduct', {title:'Thêm sản phẩm'})
};


