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


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

/*
router.get('/accounts', function(req, res, next) {
  res.render('accounts', { title: 'Express' });
});

router.get('/orders', function(req, res, next) {
  res.render('orders', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/forgotPassword', function(req, res, next) {
  res.render('forgotPassword', { title: 'Express' });
});
router.get('/myAccount', function(req, res, next) {
  res.render('myAccount', { title: 'Express' });
});

router.get('/changePassword', function(req, res, next) {
  res.render('changePassword', { title: 'Express' });
});

router.get('/products', function(req, res, next) {
  res.render('products', { title: 'Express' });
});

router.get('/statistics', function(req, res, next) {
  res.render('statistics', { title: 'Express' });
});

router.get('/addProduct', function(req, res, next) {
  res.render('addProduct', { title: 'Express' });
});

router.get('/detailProduct', function(req, res, next) {
  res.render('detailProduct', { title: 'Express' });
});

router.get('/detailAccount', function(req, res, next) {
  res.render('detailAccount', { title: 'Express' });
});*/
module.exports = router;
