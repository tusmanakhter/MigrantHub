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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, '../client/build')));
  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

app.use('/api', router);

app.use(
    expressSession({
        secret: 'migrantHub',
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
