const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to database
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

// init express
const app = express();

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Cors allows access from any domain
app.use(cors());

// parse incoming request body
app.use(bodyParser.json());

const users = require('./routes/users');
app.use('/users', users);

// routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});