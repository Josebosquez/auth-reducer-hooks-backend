var express = require('express');
var router = express.Router();

const {createUser} = require('./controller/userController')

router.get('/', function (req, res, next) {
    res.json({message: 'respond with a resource'})
})

router.post('/create-user', createUser)

module.exports = router