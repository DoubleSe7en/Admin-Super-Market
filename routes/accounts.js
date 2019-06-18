var express = require('express');
var router = express.Router();

var accounts_controller = require('../controllers/accounts/accountController');


//Get list account
router.get('/listAccount', accounts_controller.listAccount)

//Get detail account
router.get('/accounts/:id', accounts_controller.detailAccount)





module.exports = router;
