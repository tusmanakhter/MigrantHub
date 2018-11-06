var serverConfig = require('./config');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var router = require('./routes/index');

var expressSession = require('express-session')
var passport = require('./passport');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

app.use(
    expressSession({
        secret: 'publication-biology',
        resave: false,
        saveUninitialized: false
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use( (req, res, next) => {
    console.log('Session created');
    return next();
});

app.use('/', router);

app.use(express.static('uploads'))

// MongoDB/Mongoose Connection
var mongoDB = serverConfig.mongoURL;
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, (error) => {
    if (error) {
        console.error('Check if MongoDB is installed and running.');
        throw error;
    }
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

module.exports = app;
