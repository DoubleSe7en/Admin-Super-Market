var express = require('express');
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/local";

var ObjectId = require('mongodb').ObjectId;

router.post('/edit_product/:id', function(req, res, next){
  MongoClient.connect(url, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionProduct = client.db("local").collection("products");
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
      var myQuery = {_id: ObjectId(id)}; 
      collectionProduct.updateOne(myQuery, {$set: product_edit}, function(err, res){
        if(err){
          console.log(err);
        }
        else{
          console.log("product is Edited ");
        }
      });
      res.redirect('/productManager/products');
    }
  });
});

module.exports = router;
