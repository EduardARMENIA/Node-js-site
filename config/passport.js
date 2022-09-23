const passport = require('passport');
const User = require('../models/users');
const LocalStrategy = require('passport-local').Strategy;


//session code courtesy of passport.js
passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser((id, done)=> {
  User.findById(id, (err, user)=> {
    done(err, user);
  });
});

//Register new user, check is user exists and create new user
passport.use('local.register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done)=> {
  req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid Password').notEmpty().isLength({min:6});
  const errors = req.validationErrors();
  if(errors){
    const messages = [];
    errors.forEach((error)=>{
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, (err, user)=>{
    if (err){

      return done(err);
    }
    if (user){

      return done(null, false, {message:'Email is already in use'});

    }
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.save((err, result)=>{
      if (err){
        return done(err);
      }return done(null, newUser);
    });
  });
}));

//Login existing users
passport.use('local.login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},(req, email, password, done)=>{
  req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid Password').notEmpty();
  const errors = req.validationErrors();
  if(errors){
    const messages = [];
    errors.forEach((error)=>{
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, (err, user)=>{
    if (err){

      return done(err);
    }
    if (!user){
      return done(null, false, {message:'No user found'});
    }
    //check passwsord
    if( !user.validPassword(password)){
      return done(null, false, {message:'Wrong password'});
    }
    return done(null, user);
  });
}));
