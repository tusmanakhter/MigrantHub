require('dotenv').config();

const dbConfig = {
  db: {
    host: process.env.MONGO_HOST || 'localhost',
    port: parseInt(process.env.MONGO_PORT, 10) || 27017,
    name: process.env.MONGO_NAME || 'migranthub',
    user: process.env.MONGO_USER || '',
    pass: process.env.MONGO_PASS || '',
    options: process.env.MONGO_OPTIONS || '',
    atlas: process.env.MONGO_ATLAS || false,
  },
};

const recommendationServiceConfig = {
  recommendationService: {
    protocol: process.env.RECOMMENDATION_SERVICE_PROTOCOL || 'http://',
    domain: process.env.RECOMMENDATION_SERVICE_DOMAIN || 'localhost',
    path: process.env.RECOMMENDATION_SERVICE_PATH || 'api/recommendation',
    port: parseInt(process.env.RECOMMENDATION_SERVICE_PORT, 10) || 8128,
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

const dbConnectionString = () => {
  const {
    db: {
      host, port, name, user, pass, options, atlas,
    },
  } = dbConfig;

  let authString = '';
  if (user && pass) {
    authString = `${user}:${pass}@`;
  }

  let optionsString = '';
  if (options) {
    optionsString = `?${options}`;
  }

  let connectionString = '';
  if (atlas) {
    connectionString = `mongodb://${authString}${host}/${name}${optionsString}`;
  } else {
    connectionString = `mongodb://${authString}${host}:${port}/${name}${optionsString}`;
  }

  return connectionString;
};

const recommendationServiceConnectionString = () => {
  const {
    recommendationService: {
      protocol, domain, path, port,
    },
  } = recommendationServiceConfig;

  let portString = '';
  if (port) {
    portString = `:${port}`;
  }

  const connectionString = `${protocol}${domain}${portString}/${path}`;

  return connectionString;
};

const logglyConfig = {
  token: process.env.LOGGLY_TOKEN || 'migranthub_loggly_token',
  subdomain: process.env.LOGGLY_SUBDOMAIN || 'migranthub',
};

module.exports = {
  dbConfig,
  facebookConfig,
  googleConfig,
  cloudConfig,
  dialogflowConfig,
  emailConfig,
  dbConnectionString,
  recommendationServiceConnectionString,
  logglyConfig,
};
