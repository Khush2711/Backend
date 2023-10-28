require('dotenv').config()
const express = require('express');
const app = express();
const router = require('./Routes/routes');
const PORT = 2711;
const URL = process.env.DB_URL.toString();
const connection = require('./Connection/connect');


app.use(express.json());
app.use(express.urlencoded());
app.use(router);

connection.DbConnection(URL);


app.listen(PORT,()=>{console.log(`Server Running on http://localhost:${PORT}`)});