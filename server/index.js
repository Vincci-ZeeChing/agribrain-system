require('dotenv').config();


const db = require('./config/Database.js');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Agribrain System!');
});

const port = process.env.APP_PORT;

app.listen(port, () => {
    console.log(`Server up and running on port ${port}...`);
});
