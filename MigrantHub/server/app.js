const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const expressSession = require('express-session');
const router = require('./routes/index');

const serverConfig = require('./config');
const passport = require('./passport');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

if (process.env.NODE_ENV === 'production') {
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
    secret: 'publication-biology',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => next());


app.use(express.static('uploads'));

// MongoDB/Mongoose Connection
const mongoDB = serverConfig.mongoURL;
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, (error) => {
  if (error) {
    console.error('Check if MongoDB is installed and running.');
    throw error;
  }
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

module.exports = app;
