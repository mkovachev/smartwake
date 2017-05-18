const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

// MongoDB
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config/database');
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

//init express
const app = express();

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// cors allows requests from any domain
app.use(cors());

// parse incoming data
app.use(bodyParser.json());

// passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// routes
const users = require('./routes/users');
app.use('/users', users);
// send all routes to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});