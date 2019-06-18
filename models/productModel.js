var mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
var ObjectId = require('mongodb').ObjectId;
var Schema = mongoose.Schema;

var product = new Schema({
  id: String,
  name: String,
  price: Number,
  sale: Number,
  unit: String,
  category: String,
  count: Number,
  numberSold: Number,
  color: String,
  size: String,
  rateAverage: Number,
  info: String,
  imgSrc: String,
  dateAdd: Date
}, { collection: 'products' });
const list = mongoose.model('products', product);

var nameImage = "";

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/images/',
  filename: function (req, file, cb) {
    nameImage = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    cb(null, nameImage);
  }
});


// Init Upload
var upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('imgSrc');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

const addProduct = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      if (req.file == undefined) {
        console.log("Chua them anh");
      } else {
        console.log(nameImage);
        console.log("Da them anh");
        const data = new product(req.body);
        data.imgSrc = "/images/" + nameImage;
        list.insertOne(data, function (err, res) {
          if (err) {
            console.log(err);
          }
          else {
            console.log("product is added");
          }
        res.redirect('productManager/products');
        });
      }
    }
  });
}


const deleteProduct = async (req, res) => {
  var id = req.params.id;
  var myQuery = {id: ObjectId(id)};
  await list.deleteOne(myQuery, function(err, res){
    if(err){
      console.log(err);
    }
    else{
      console.log("product is Deleted");
    }
  });
  res.redirect('/products/listProduct');
}


const editProduct = async (req, res) => {
  var product_edit = {
    name: req.body.name,
    count: req.body.count,
    price: req.body.price,
    sale: req.body.sale,
    category: req.body.category,
    color: req.body.color,
    size: req.body.size,
    info: req.body.info
  };
  var id = req.params.id;
  var myQuery = { id: ObjectId(id) };
  await list.updateOne(myQuery, { $set: product_edit }, function (err, res) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("product is Edited ");
    }
    res.redirect('/productManager/products');
  });
}



module.exports = {
  list: list,
  addProduct: addProduct,
  editProduct: editProduct,
  deleteProduct: deleteProduct
}
