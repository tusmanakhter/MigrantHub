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
  profileFields: ['id', 'name', 'email'],
};

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

const cloudConfig = {
  projectId: 'migranthub',
};

const dialogflowConfig = {
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
  },
};

const emailConfig = {
  email: process.env.HOTMAIL_EMAIL,
  password: process.env.HOTMAIL_PASSWORD,
};

module.exports = {
  dbConfig, facebookConfig, googleConfig, cloudConfig, dialogflowConfig, emailConfig,
};
