const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const expressSession = require('express-session');
const router = require('./routes/Index');

const { dbConnectionString } = require('./config');
const passport = require('./passport');
const { logger, formatMessage } = require('./config/winston');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use(
  expressSession({
    secret: 'publication-biology',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
  app.use(morgan(':remote-addr [:date[clf]] ":method :url HTTP/:http-version" :status ":referrer"', { stream: logger.streamProd }));
} else {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(morgan(':remote-addr [:date[clf]] ":method :url HTTP/:http-version" :status ":referrer"', { stream: logger.streamDev }));
}

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (err) {
      logger.info(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion, err.status, req.referer, '-', err.message));
    } else {
      logger.info(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion, req.statusCode, req.referer, '-', '-'));
    }
  } else if (err) {
    logger.debug(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion, err.status, req.referer, '-', err.message));
  } else {
    logger.debug(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion, req.statusCode, req.referer, '-', '-'));
  }
  next();
});

// MongoDB/Mongoose Connection
const connectionString = dbConnectionString();
mongoose.Promise = global.Promise;
mongoose.connect(connectionString, (error) => {
  if (error) {
    console.error('Check if MongoDB is installed and running.');
    throw error;
  }
});
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB connection error: '));

module.exports = app;
