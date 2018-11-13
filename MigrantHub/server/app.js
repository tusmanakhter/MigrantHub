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

require('dotenv').config();

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

app.use((req, res, next) => next());

// MongoDB/Mongoose Connection
const { db: { host, port, name } } = serverConfig;
const connectionString = `mongodb://${host}:${port}/${name}`;
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
