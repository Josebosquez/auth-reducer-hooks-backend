var express = require('express');
var router = express.Router();

const {createUser, login} = require('./controller/userController')

router.get('/', function (req, res, next) {
    res.json({message: 'respond with a resource'})
})

router.post('/create-user', createUser)
router.post('/login', login)

module.exports = router