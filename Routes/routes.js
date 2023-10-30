const express = require('express');
const app = express.Router();

const { registration, login } = require('../Handler/registration_&_login');
const { pdfViewer , generatePdf } = require('../Handler/PDF');

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.post('/registration', registration);


app.get('/login', login);

app.get('/pdfViewer',pdfViewer);
app.get('/pdfGenerate',generatePdf);



module.exports = app;
