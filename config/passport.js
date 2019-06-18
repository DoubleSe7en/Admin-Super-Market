const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/adminModel');

module.exports = function (passport) {
    passport.use('local-login', new LocalStrategy({ usernameField: 'username', passwordField: 'password', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                const admin = await Admin.list.findOne({ 'username': username });
                if (!admin) {
                    return done(null, false, req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không đúng'));
                }
                const isValidPass = await Admin.validPassword(username, password);
                if (!isValidPass) {
                    return done(null, false, req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không đúng'));
                }
                return done(null, admin);
            } catch (e) {
                console.log(e);
                return done(e);
            }
        }
    ))

    passport.serializeUser(function (admin, done) {
        done(null, admin);
    });

    passport.deserializeUser(function (admin, done) {
        done(null, admin);
    });
}