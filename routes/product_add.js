var express = require('express');
const multer = require('multer');
const path = require('path');
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/local";

const product = require("../models/productModel");

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





router.post('/add_product', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            if (req.file == undefined) {
                console.log("Chua them anh");
            } else {
                console.log(nameImage);
                console.log("Da them anh");
                MongoClient.connect(url, function (err, client) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        const collectionProduct = client.db("local").collection("products");
                        const data = new product(req.body);
                        data.imgSrc = "/images/" + nameImage;

                        collectionProduct.insertOne(data, function (err, res) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("product is added");
                            }
                        });
                        res.redirect('productManager/products');
                    }
                });

            }
        }
    });
});
/*
router.post('/add_product', function (req, res, next) {
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err);
        }
        else {
            const collectionProduct = client.db("local").collection("products");
            const data = new product(req.body);


            collectionProduct.insertOne(data, function (err, res) {
                if(err){
                    console.log(err);
                }
                else{
                    console.log("product is added");
                }
            });

            

            res.redirect('productManager/products');
        }
    });
});*/

module.exports = router;
