const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport =require('passport');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const validator = require('express-validator');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const ejs = require('ejs');
var bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost:27017/js_cart1',{ useNewUrlParser: true });
require('./config/passport');

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view engine', 'hbs');
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({secret: 'fatcat',
 resave: false,
 saveUninitialized: false,
 store: new mongoStore({ mongooseConnection: mongoose.connection}),
 cookie:{ maxAge: 100 * 60 *100}//set it to 3 hrs
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
  app.use('/user', express.static(__dirname + '/public'));
//verify if authenticated
app.use((req, res, next)=>{
  res.locals.login =req.isAuthenticated();
  //access sessions through templates
  res.locals.session = req.session;
  next();
});

//routes
app.use('/',  require('./routes/index'));
app.use('/user', require('./routes/user'));


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
