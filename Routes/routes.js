const express = require('express');
const app = express.Router();

const { registration, login , form, logout } = require('../Handler/registration_&_login');
const { isLoggedIn } = require('../middleware/auth');

app.get('/', (req, res) => {
    res.send('Welcome');
});
app.route('/registration').post(registration);
app.route('/login').post(login);
app.route('/form').post(isLoggedIn,form)
app.route('/logout').get(logout)




module.exports = app;
