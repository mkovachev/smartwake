const express = require('express');
const router = express.Router();
const config = require('../config/database');

// register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Faile to register user'
            })
        } else {
            res.json({
                success: true,
                msg: 'User registered'
            })
        }
    })
})

module.exports = router;