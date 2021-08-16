require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

const passport = require("passport")
const userPassportStrategy = require('./routes/utils/passport/userPassport')

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MONGO DB CONNECTED"))
  .catch((e) => console.log(e))

var app = express();

app.use(passport.initialize())

passport.use('jwt-user', userPassportStrategy)

let originUrl = process.env.NODE_ENV === "development"
  ? "http://localhost:3000"
  : "DEPLOY URL";

const usersRouter = require('./routes/users/usersRouter')

app.use(cors({ origin: 'http://localhost:3000', credentials: true })) // to help with cookies

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
  console.log(err)
});

module.exports = app;


// app.js 
// we have passport, we bring it in at the top and we also bring in userPassportStrategy. 
// in userPassport, we also bring in jwtStrategy. it says i want to use this strategy called (passport-jwt).strategy and we extract it out.
// bring in our user and we bring in our env secret key.

// jwtOtps.JwtFromRequests = extractJwt.fromAughtHeaderasBearerToken().  check auth-backend file from a few weeks ago to understand wat it is. this function is handling it for us so we dont have to retype it.
// jwtOpts.sercreOrKey = keys  checks the keys.

// const userJWTLOGINSTRAT is a new strat. i wanna use a new strat and set it as a variable. pass in our jwtObpts(obj), passing in async, pass in our payload. payload is the decoded token that has our username and email. done is the same thing as next ().

// if useremail exists, we check if the email belongs to a user in our database.
// if the !user (doesnt exist), return null false, else return null and the user. once this is done, we go back to app.js. (we already brought it in as userPassportStrat)

// passport.use('jwt-user',userPassportStrat.) the jwt-user is the name of path we want to use. it must match our path in our router when we call for it. then we call the func we just created.

// not everyone can update profile, so how do we use passport.authentication. 

// log in and grab the token from ur cookie.