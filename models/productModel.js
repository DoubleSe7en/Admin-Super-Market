var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
  name: String,
  price: Number,
  sale: Number,
  unit: String,
  category: String,
  count: Number,
  numberSold: Number,
  color: String,
  size: String,
  rate: Number,
  info: String,
  imgSrc: String
},{collection: 'products'});

module.exports = mongoose.model('products',product);
