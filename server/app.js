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


//adding headers to response
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST'); 
        return res.status(200).json({});
    }
})


//routes to handle
app.use('/login', loginRoutes);


//root route
app.get('/', (req, res, next) => {
    res.sendFile('./client/index.html', {root: __dirname + '/../'});
});

//not found page
app.use('*', (error, req, res, next) => {
    res.status(404);
});


module.exports = app;
