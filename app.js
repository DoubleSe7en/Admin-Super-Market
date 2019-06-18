var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const hbs = require('hbs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var accountRouter = require('./routes/accounts');
var adminRouter = require('./routes/admin');
const apiAdminRouter = require('./routes/api/adminAPI');
require('./config/passport')(passport);

var app = express();


// connect to mongodb atlas
var mongoose = require('mongoose');
mongoose.Promise = Promise;
const option = {
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: 1000000,
  reconnectInterval: 3000
};
const run = async () => {
  await mongoose.connect('mongodb+srv://nguyencuong1827:cuongkhtn1997@cluster0-5gcvu.mongodb.net/Super-Market', option);
}
run().catch(error => console.error(error));



var blocks = {};

hbs.registerHelper('extend', function(name, context) {
  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }

  block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
  var val = (blocks[name] || []).join('\n');

  // clear the block
  blocks[name] = [];
  return val;
});


// view engine setup """"
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/accounts', accountRouter);
app.use('/admin', adminRouter);
app.use('/api/adminAPI', apiAdminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
