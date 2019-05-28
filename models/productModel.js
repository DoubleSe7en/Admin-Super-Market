var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
  name: String,
  imgSrc: String,
  count: Number,
  price: Number,
  sale: Number,
  category: String,
  color: String,
  size: String,
  rate: Number,
  info: String,
  uri: String,
  row1: String,
  row2: String,
  row3: String
},{collection: 'products'});

module.exports = mongoose.model('products',product);
