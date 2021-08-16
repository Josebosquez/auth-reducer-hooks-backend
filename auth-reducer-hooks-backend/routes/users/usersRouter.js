var express = require('express');
var router = express.Router();
var passport = require('passport')

const {createUser, login} = require('./controller/userController')

router.get('/', function (req, res, next) {
    res.json({message: 'respond with a resource'})
})

router.post('/create-user', createUser)
router.post('/login', login)

router.put('/update-profile', passport.authenticate('jwt-user', {session: false}), function (req,res){
    res.send('YAY!') // should return unauthorized the first time.
})

router.get('/logout', function (req,res){
    res.clearCookie('jwt-cookie');
    res.send('Logged Out!')
})

module.exports = router

//instead of writing all the code to check jwt-tokens, we have passport taking care of it for us.
