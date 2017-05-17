const express = require('express');
const router = express.Router();
const config = require('../config/database');

// register
router.get('/register', (req, res, next) => {
    res.send('');
})

module.exports = router;