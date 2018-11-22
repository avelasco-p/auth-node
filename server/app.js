const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authToken = require('./middleware/check-auth');


//connecting to mongodb
mongoose.connect('mongodb://localhost/dm-audiogram', { 
    useCreateIndex: true,
    useNewUrlParser: true 
});

mongoose.set('debug', true);


//starting express app
const app = express();


//routes
const loginRoutes = require('./routes/login');
const audiogramRoutes = require('./routes/audiogram');


//adding middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    name: 'jwttoken',
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,
}));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST'); 
        return res.status(200).json({});
    }

    next();

})


//routes to handle
app.get('/', (req, res, next) => {
    res.sendFile('./client/index.html', {root: __dirname + '/../'});
});
app.use('/login', loginRoutes);
app.use('/audiogram', audiogramRoutes);

app.use('*', (error, req, res, next) => {
    res.status(404);
});


module.exports = app;
