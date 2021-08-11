const bcrypt = require('bcryptjs')
const User = require('../model/User')

const dbErrorHelper = require('../lib/dbErrorHelper')

async function createUser(req, res){
    try {
        let genSalt = await bcrypt.genSalt(12);
        let hashedPassword = await bcrypt.hash(req.body.password, genSalt);
        console.log(hashedPassword);

        let createdUser = new User({
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
        })

        await createdUser.save();
        
        res.json({
            message: 'user created',
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: dbErrorHelper(e)});
    }
}

module.exports = {
    createUser,
}