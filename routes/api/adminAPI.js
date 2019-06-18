var express = require('express');
var router = express.Router();
var user_controller = require('../../controllers/api/adminAPIController');

router.get('/checkEmail', user_controller.checkEmail);
router.get('/checkUsername', user_controller.checkUsername);
module.exports = router;