var express = require('express');
var router = express.Router();
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');
var admin_controller = require('../controllers/admin/adminController');

//Login page
router.get('/login', forwardAuthenticated, admin_controller.login_page);

// Login Process
router.post('/login', passport.authenticate('local-login', {
      successRedirect:'/',
      failureRedirect:'/admin/login',
      failureFlash: true
   
  }));


router.get('/register', admin_controller.register_page);
 
router.post('/register', admin_controller.register_process);

router.get('/logout', admin_controller.logout_page);

router.get('/forgotPassword', admin_controller.forgotPassword_page)

router.get('/detailAdmin', admin_controller.detailAdmin_page)

router.get('/changePassword', admin_controller.changePassword_page)
module.exports = router;