const Admin = require('../../models/adminModel');

exports.checkEmail = async (req, res, next) => {
  const userExist = await Admin.checkEmail(req.query.email);
  res.json(userExist);
};
exports.checkUsername = async (req, res, next) => {
  const userExist = await Admin.checkUsername(req.query.username);
  res.json(userExist);
};