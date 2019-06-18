var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var admin = new Schema({
  username: String,
  password: String,
  email: String,
},{collection: 'admin'});


const list = mongoose.model('admin', admin);

const saveAdmin = async (admin) => {
  const newAdmin = new list(admin);
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newAdmin.password, salt, function (err, hash) {
      if (err) {
        console.log(err);
      }
      newAdmin.password = hash;
      newAdmin.save(function (err) {
        if (err) {
          console.log(err);
          return false;
        } else {
          return true;
        }
      });
    });
  });
};

const validPassword = async (username, password) => {
  const user = await list.findOne({ 'username': username });
  if (!user)
    return false;
  return await bcrypt.compare(password, user.password);
};

const checkEmail = async (email) => {
  const user = await list.findOne({ 'email': email });
  if (!user)
    return true;
  return false;
};
const checkUsername = async (username) => {
  const user = await list.findOne({ 'username': username });
  if (!user)
    return true;
  return false;
};

module.exports = {
    list: list,
    saveAdmin: saveAdmin,
    validPassword: validPassword,
    checkEmail: checkEmail,
    checkUsername
}
