const appRoot = require('app-root-path');
const {
  createLogger, format, transports, add,
} = require('winston');
require('winston-loggly-bulk');
const { logglyConfig } = require('../config');

const {
  combine, timestamp, printf, colorize,
} = format;

// Logger formatter
const formatMessage = (ip, method, url, httpVersion, status, referrer, customMessage, errorMessage) => `${ip} "${method} ${url} HTTP/${httpVersion}" ${status} ${referrer} "${customMessage}" "${errorMessage}"`;
// Logger file format
const myFormatFile = printf(info => `${info.timestamp} : ${info.level}: ${info.message}`);
// Logger console format
const myFormatConsole = printf(debug => `${debug.timestamp} : ${debug.level}: ${debug.message}`);

// Logger log settings
const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: combine(
      timestamp(),
      myFormatFile,
    ),
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    format: combine(
      colorize(),
      timestamp(),
      myFormatConsole,
    ),
  },
  loggly: {
    level: 'info',
    inputToken: logglyConfig.token,
    json: true,
    stripColors: true,
    subdomain: logglyConfig.subdomain,
    tags: ['Winston-NodeJS'],
  },
};

const logglyTransport = new transports.Loggly(options.loggly);
add(logglyTransport, null, true);

let logger;

if (process.env.NODE_ENV === 'production') {
  // Create file and loggly Winston Logger transport for production
  logger = createLogger({
    transports: [
      new transports.File(options.file),
      new transports.Console(options.console),
      logglyTransport,
    ],
    exitOnError: false,
  });
} else {
  // Create file and console Winston Logger transport
  logger = createLogger({
    transports: [
      new transports.File(options.file),
      new transports.Console(options.console),
    ],
    exitOnError: false,
  });
}


logger.streamProd = {
  write(message) {
    logger.info(message);
  },
};
logger.streamDev = {
  write(message) {
    logger.debug(message);
  },
};

module.exports = { logger, formatMessage };
