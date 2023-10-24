const express = require('express');
const app = express();
const router = require('./Routes/routes');
const pass = "kNUixgO5xr4pFB5L";
const PORT = 2711;
const URL = `mongodb+srv://Khush:${pass}@suvidha.obaoiv6.mongodb.net/`;
const connection = require('./Connection/connect');


app.use(express.json());
app.use(express.urlencoded());
app.use(router);

connection.DbConnection(URL);


app.listen(PORT,()=>{console.log(`Server Running on http://localhost:${PORT}`)});