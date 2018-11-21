const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/', (req, res) => {
    res.send('home page');
});


app.get('/login', (req, res) => {
    res.send('this should be a file with login form');
});

app.post('/login', (req, res) => {
    req.headers()
    res.json({
        status: 200,
        message: 'logged in succesfully',
    });
});

app.get('*', (req, res) => {
    res.json({
        status: 404,
        message: 'page not found',
    })
});


app.listen(8000, (req, res) => {
    console.log(`listening on port ${8000}`);
});