var serverConfig = require('./config');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var router = require('./routes/routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

app.use('/', indexRouter);
app.use('/', router);

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
