var express = require('express');
var router = express.Router();

var login_controller = require('../controllers/loginController');
var register_controller = require('../controllers/registerController');
var forgotPassword_controller = require('../controllers/forgotPasswordController');
var changePassword_controller = require('../controllers/changePasswordController');

var accountManager_controller = require('../controllers/accountManagerController');
var myAccount_controller = require('../controllers/myAccountController');

var addProduct_controller = require('../controllers/addProductController');

var orderManager_controller = require('../controllers/orderManagerController');

var statistic_controller = require('../controllers/statisticController');

const { forwardAuthenticated } = require('../config/auth');
/* GET home page. */
router.get('/', forwardAuthenticated,function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('index', { title: 'Trang chủ'});
  }
  else {
    res.render('admin/login', { title: 'Đăng nhập' });
  }
});

/* GET user page. */
router.get('/login', login_controller.login_page);
router.get('/register', register_controller.register_page);
router.get('/forgotPassword', forgotPassword_controller.forgotPassword_page);
router.get('/changePassword', changePassword_controller.changePassword_page);



router.get('/addProduct', addProduct_controller.addProduct_page);

/* GET account manager page. */
router.get('/accountManager', accountManager_controller.accountManager_page);
router.get('/accountManager/account=01', accountManager_controller.detailAccount);
router.get('/myAccount', myAccount_controller.myAccount_page);

/* GET order manager page. */
router.get('/orderManager', orderManager_controller.orderManager_page);

/* GET statistic page. */
router.get('/statistic', statistic_controller.statistic_page);


module.exports = router;
