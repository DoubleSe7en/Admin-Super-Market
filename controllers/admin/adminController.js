const admin = require('../../models/adminModel');
//Login page
exports.login_page = function (req, res) {
    res.render('admin/login', {title:'Đăng nhập', error: req.flash('loginMessage'), success: req.flash('registerMessage')});
};

//Register page
exports.register_page = function (req, res) {
    res.render('admin/register', {title:'Đăng ký'});
};
//Register process
exports.register_process = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    let newAdmin = new admin.list({
        username: username,
        password: password,
        email: email
    });
    if (admin.saveAdmin(newAdmin)) {
        req.flash('registerMessage', 'Đăng ký thành công');
        res.redirect('/admin/login');
    }
};

exports.logout_page = function (req, res) {
    req.logout();
    res.redirect('/admin/login');
}


exports.forgotPassword_page = function (req, res) {
    res.render('admin/forgotPassword', {title:'Quên mật khẩu'});
};

exports.detailAdmin_page = function (req, res) {
    res.render('admin/detailAdmin', {title:'Tài khoản'});
};

exports.changePassword_page = function (req, res) {
    res.render('admin/changePassword', {title:'Tài khoản'});
};