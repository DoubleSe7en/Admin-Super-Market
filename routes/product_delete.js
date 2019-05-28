var express = require('express');
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/local";
var ObjectId = require('mongodb').ObjectId;

router.post('/delete_product/:id', function(req, res, next){
  MongoClient.connect(url, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionProduct = client.db("local").collection("products");
      var id = req.params.id;
      var myQuery = {_id: ObjectId(id)};
      collectionProduct.deleteOne(myQuery, function(err, res){
        if(err){
          console.log(err);
        }
        else{
          console.log("product is Deleted");
        }
      });
      res.redirect('/productManager/products');
    }
  });
});

module.exports = router;
