const express = require('express');
const app = express.Router();

const { registration, login } = require('../Handler/registration_&_login');

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.post('/registration', registration);


app.get('/login', login);


module.exports = app;