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
const fflip = require('fflip');
const FFlipExpressIntegration = require('fflip-express');
const fflipConfig = require('./fflip_config');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use(
  expressSession({
    secret: 'publication-biology',
    resave: false,
    saveUninitialized: false,
  }),
);
fflip.config(fflipConfig);
var fflipExpress = new FFlipExpressIntegration(fflip);
app.use(fflipExpress.middleware);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

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
