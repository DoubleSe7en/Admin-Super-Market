var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var account = new Schema({
  name: String,
  birthDay: String,
  phoneNumber: String,
  email: String,
  username: String,
  password: String,
  dateCreate: String,
  power: String
},{collection: 'accounts'});

module.exports = mongoose.model('accounts',account);
