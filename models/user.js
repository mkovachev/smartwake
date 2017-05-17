const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    products: [{
        product: {
            type: String,
            ref: 'Product'
        }
    }]
});

const User = module.exports = mongoose.model('User', UserSchema);