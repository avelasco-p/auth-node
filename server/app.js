const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//starting express app
const app = express();

//routes
const loginRoutes = require('./api/routes/login');

//adding middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/login', loginRoutes);


app.get('/', (req, res, next) => {
    res.sendFile('./client/index.html', {root: __dirname + '/../'});
});

app.use('*', (error, req, res, next) => {
    res.status(404);
});


module.exports = app;
