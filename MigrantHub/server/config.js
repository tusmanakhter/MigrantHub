require('dotenv').config();

const dbConfig = {
  db: {
    host: process.env.MONGO_HOST || 'localhost',
    port: parseInt(process.env.MONGO_PORT, 10) || 27017,
    name: process.env.MONGO_NAME || 'migranthub',
  },
};

const facebookConfig = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/api/accounts/auth/facebook/callback',
  profileFields: ['id', 'name', 'email'],
};

module.exports = { dbConfig, facebookConfig };
