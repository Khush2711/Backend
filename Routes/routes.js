const express = require('express');
const app = express.Router();
const path = require('path');

const { registration, login , form, logout } = require('../Handler/registration_&_login');
const { isLoggedIn } = require('../middleware/auth');
const { pdfViewer , generatePdf } = require('../Handler/PDF');
const { readdir } = require('fs/promises');

app.get('/', (req, res) => {
    res.send('Welcome');
});


app.route('/registration').post(registration);
app.route('/login').post(login);
app.route('/form').post(isLoggedIn,form)
app.route('/logout').get(logout)
app.get('/pdfViewer',pdfViewer);
app.get('/pdfGenerate',generatePdf);

module.exports = app;